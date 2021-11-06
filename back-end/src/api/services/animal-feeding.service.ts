import { AnimalFeeding, User } from '../models';
import { Animal, AnimalEnum, Feeding, Food } from '../models/animal-feeding.model';

/**
 * Class intended to return Animal Feeding services
 *
 */
export default class AnimalFeedingService {
  /**
   * Method to return animal feedings from animal informed
   *
   * @param  {AnimalEnum} animal: type of animal
   * @returns {Promise<Array<AnimalFeeding>>}: promise to return list of AnimalFeeding
   */
  public static async getFeedings(animal: AnimalEnum): Promise<Array<AnimalFeeding>> {
    return [
      new AnimalFeeding(
        'id',
        'create_At',
        new Animal(animal, 1),
        new Feeding('id', new Food('name', 'type'), 'time', 'location', 1),
        new User('email', 'name')
      )
    ];
  }
}
