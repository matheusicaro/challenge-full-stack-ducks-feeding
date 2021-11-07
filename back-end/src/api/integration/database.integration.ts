import { AnimalEnum } from '../models/animal-feeding.model';
import AnimalFeedingDTO from './dto/animal-feeding.dto';
import DatabaseInstance from '../../config/database';
import AnimalFeedingTable from './table/animal-feeding.table';
import FeedingTable from './table/feeding.table';
import FoodTable from './table/food.table';

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

  /**
   * Method to save new animal
   *
   * @param  {AnimalFeedingTable} animalFeeding
   * @returns {Promise<AnimalFeedingTable>}: promise to return new AnimalFeeding saved
   */
  public static async saveAnimalFeeding(animalFeeding: AnimalFeedingTable): Promise<AnimalFeedingTable> {
    const animalQuantityColumnName = 'animal_quantity';
    const animalNameColumnName = 'animal_name';
    const feedingIdColumnName = 'feeding_id';
    const userIdColumnName = 'user_id';

    const query = `
        INSERT INTO ${this.TABLE_ANIMAL_FEEDING} (
          ${animalQuantityColumnName}, 
          ${animalNameColumnName}, 
          ${feedingIdColumnName}, 
          ${userIdColumnName}
        )
        VALUES (
          ${animalFeeding.getAnimalQuantity()}, 
          '${animalFeeding.getAnimalName()}', 
          ${animalFeeding.getFeedingId()}, 
          '${animalFeeding.getUserId()}'
        )
        RETURNING *
    `;
    const result = await DatabaseInstance.query<AnimalFeedingDTO>(query);
    return new AnimalFeedingTable(result.rows[0]);
  }

  /**
   * Method to save new Feeding
   *
   * @param  {FeedingTable} feeding
   * @returns {Promise<FeedingTable>}: promise to return new Feeding saved
   */
  public static async saveFeeding(feeding: FeedingTable): Promise<FeedingTable> {
    const timeColumnName = '"time"';
    const locationColumnName = '"location"';
    const quantityKilosColumnName = 'quantity_kilos';
    const foodNameColumnName = 'food_name';

    const query = `
        INSERT INTO ${this.TABLE_FEEDING} (
          ${timeColumnName}, 
          ${locationColumnName}, 
          ${quantityKilosColumnName}, 
          ${foodNameColumnName}
        )
        VALUES (
          '${feeding.getTime()}', 
          '${feeding.getLocation()}', 
          ${feeding.getQuantityKilos()}, 
          '${feeding.getFoodName()}'
        )
        RETURNING *
    `;

    const result = await DatabaseInstance.query<FeedingTable>(query);
    return new FeedingTable(result.rows[0]);
  }

  /**
   * Method to save new Feeding
   *
   * @param  {FoodTable} food
   * @returns {Promise<Array<void>}: promise to return new Food saved
   */
  public static async saveFood(food: FoodTable): Promise<void> {
    const nameColumnName = '"name"';
    const typeColumnName = '"type"';
    const notExistItem = 'CONFLICT DO NOTHING';

    const query = `
        INSERT INTO ${this.TABLE_FOOD} (
          ${nameColumnName}, 
          ${typeColumnName}
        )
        VALUES (
          '${food.getName()}', 
          '${food.getType()}'
        )
        ON ${notExistItem}
    `;

    await DatabaseInstance.query<FoodTable>(query);
  }
}
