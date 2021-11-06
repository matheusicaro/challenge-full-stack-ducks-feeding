import DatabaseIntegration from '../integration/database.integration';
import AnimalFeedingDTO from '../integration/dto/animal-feeding.dto';
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
  public static async getFeedings(animalName: AnimalEnum): Promise<Array<AnimalFeeding>> {
    const feedingDTOs = await DatabaseIntegration.getFullRelationFeedingBy(animalName);

    const buildAnimalFeeding = (dto: AnimalFeedingDTO): AnimalFeeding => {
      const animal = new Animal(AnimalEnum[animalName], dto.getAnimalQuantity());
      const food = new Food(dto.getFoodName(), dto.getFoodType());
      const feeding = new Feeding(dto.getFeedingId(), food, dto.getTime(), dto.getLocation(), dto.getQuantityKilos());
      const user = new User(dto.getUserId(), dto.getUserName());

      return new AnimalFeeding(dto.getId(), new Date(dto.getCreatedAt()), animal, feeding, user);
    };

    return feedingDTOs.map(buildAnimalFeeding);
  }
}
