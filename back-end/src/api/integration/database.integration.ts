import { AnimalEnum } from '../models/animal-feeding.model';
import AnimalFeedingDTO from './dto/animal-feeding.dto';

/**
 * Class intended to return Animal Feeding services
 *
 */
export default class DatabaseIntegration {
  /**
   * Method to return animal feedings from animal informed
   *
   * @param  {AnimalEnum} animalName: type of animal
   * @returns {Promise<Array<AnimalFeeding>>}: promise to return list of AnimalFeeding
   */
  public static async getFullRelationFeedingBy(animalName: AnimalEnum): Promise<Array<AnimalFeedingDTO>> {
    return [];
  }
}
