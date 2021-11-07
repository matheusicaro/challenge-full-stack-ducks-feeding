import { AnimalEnum } from '../models/animal-feeding.model';
import AnimalFeedingDTO from './dto/animal-feeding.dto';
import DatabaseInstance from '../../config/database';

/**
 * Class intended to return Animal Feeding services
 *
 */
export default class DatabaseIntegration {
  private static readonly TABLE_ANIMAL_FEEDING: string = 'animal_feeding';
  private static readonly TABLE_FEEDING: string = 'feeding';
  private static readonly TABLE_FOOD: string = 'food';
  private static readonly TABLE_USER: string = '"user"';

  /**
   * Method to return animal feedings from animal informed
   *
   * @param  {AnimalEnum} animalName: type of animal
   * @returns {Promise<Array<AnimalFeeding>>}: promise to return list of AnimalFeeding
   */
  public static async getFullRelationFeedingBy(animalName: AnimalEnum): Promise<Array<AnimalFeedingDTO>> {
    const feedinIdgAlias = 'feeding.id AS feeding_id';
    const foodTypeAlias = 'food.type AS food_type';
    const userName = '"user".name as user_name';

    const sameFeeding = 'animal_feeding.feeding_id = feeding.id';
    const sameFoodName = 'feeding.food_name = food.name';
    const sameUser = '"user".email = animal_feeding.user_id';
    const isTheSameAnimal = `animal_feeding.animal_name = '${animalName}'`;

    const query = `
        SELECT *, ${feedinIdgAlias}, ${foodTypeAlias}, ${userName}
        FROM ${this.TABLE_ANIMAL_FEEDING}
        INNER JOIN ${this.TABLE_FEEDING} ON ${sameFeeding}
        INNER JOIN ${this.TABLE_FOOD} ON ${sameFoodName}
        INNER JOIN ${this.TABLE_USER} ON ${sameUser}
        WHERE ${isTheSameAnimal}
    `;

    const result = await DatabaseInstance.query<AnimalFeedingDTO>(query);

    return result.rows.map(r => new AnimalFeedingDTO(r));
  }
}
