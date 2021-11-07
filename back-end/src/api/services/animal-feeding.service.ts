import { Logger } from '../../config/logger';
import { MESSAGES } from '../constants';
import { ErrorResponse, HttpStatusCode } from '../exceptions';
import DatabaseIntegration from '../integration/database.integration';
import AnimalFeedingTableDTO from '../integration/dto/animal-feeding.dto';
import AnimalFeedingTable from '../integration/table/animal-feeding.table';
import FeedingTable from '../integration/table/feeding.table';
import FoodTable from '../integration/table/food.table';
import { AnimalFeeding, User } from '../models';
import { Animal, AnimalEnum, Feeding, Food } from '../models/animal-feeding.model';
import AnimalFeedingDTO, { FeedingDTO } from '../models/dto/new-animal-feeding.dto';
import { StringUtil } from '../utils';

/**
 * Class intended to return Animal Feeding services
 *
 */
export default class AnimalFeedingService {
  private static USER_NOT_FOUND = 'User not found in database.';
  private static INVALID_FEEDING_MESSAGE = `Animal feed is invalid to be saved. The attributes animal.name, food.name, food.type, feeding.time, 
  user_id - are required.`;

  /**
   * Method to return animal feedings from animal informed
   *
   * @param  {AnimalEnum} animal: type of animal
   * @returns {Promise<Array<AnimalFeeding>>}: promise to return list of AnimalFeeding
   */
  public static async getFeedings(animalName: AnimalEnum): Promise<Array<AnimalFeeding>> {
    const feedingDTOs = await DatabaseIntegration.getFullRelationFeedingBy(animalName);

    const buildAnimalFeeding = (dto: AnimalFeedingTableDTO): AnimalFeeding => {
      const animal = new Animal(AnimalEnum[animalName], dto.getAnimalQuantity());
      const food = new Food(dto.getFoodName(), dto.getFoodType());
      const feeding = new Feeding(dto.getFeedingId(), food, dto.getTime(), dto.getLocation(), dto.getQuantityKilos());
      const user = new User(dto.getUserId(), dto.getUserName());

      return new AnimalFeeding(dto.getId(), new Date(dto.getCreatedAt()), animal, feeding, user);
    };

    return feedingDTOs.map(buildAnimalFeeding);
  }

  /**
   * Method responsible for saving new animal feeding
   *
   * @param  {AnimalFeedingDTO} animalFeeding
   * @returns {Promise<Array<AnimalFeeding>>}: promise to return new AnimalFeeding created
   */
  public static async saveAnimalFeeding(animalFeeding: AnimalFeedingDTO): Promise<AnimalFeeding> {
    const isValidAnimalFeeding = this.isValidAnimalFeeding(animalFeeding);

    if (isValidAnimalFeeding) throw new ErrorResponse(this.INVALID_FEEDING_MESSAGE, HttpStatusCode.BAD_REQUEST);

    const foodTableItem = this.buildFoodTableItem(animalFeeding.getFeeding().getFood());
    const feedingTableItem = this.buildFeedingTableItem(animalFeeding.getFeeding());
    let newFeedingItem: FeedingTable;
    let newAnimalFeedingItem: AnimalFeedingTable;

    try {
      await DatabaseIntegration.saveFood(foodTableItem);
      newFeedingItem = await DatabaseIntegration.saveFeeding(feedingTableItem);
      newAnimalFeedingItem = await DatabaseIntegration.saveAnimalFeeding(
        this.buildAnimalFeedingTableItem(newFeedingItem.getId(), animalFeeding.getUser(), animalFeeding.getAnimal())
      );
    } catch (error) {
      Logger.error(error);
      const message = this.errorByUserNotFound(error)
        ? `${MESSAGES.UNPROCESSABLE} ${this.USER_NOT_FOUND}`
        : MESSAGES.EXTERNAL_ERROR;

      throw new ErrorResponse(message, HttpStatusCode.UNPROCESSABLE);
    }

    const feeding = this.buildFeedingFrom(newFeedingItem, animalFeeding.getFeeding().getFood());
    const createdAt = new Date(newFeedingItem.getCreatedAt());

    return new AnimalFeeding(
      newAnimalFeedingItem.getId(),
      createdAt,
      animalFeeding.getAnimal(),
      feeding,
      animalFeeding.getUser()
    );
  }

  /**
   * method to validate if object of type AnimalFeeding is invalid to be saved in database
   *
   * @param  {AnimalFeeding} feeding
   * @returns {boolean}:
   */
  private static isValidAnimalFeeding(feeding: AnimalFeedingDTO): boolean {
    const invalidAnimalName = !feeding || !feeding.getAnimal() || !feeding.getAnimal().getName();

    if (invalidAnimalName) return true;

    const invalidFeedingTime = !feeding.getFeeding() || StringUtil.isNullOrEmpty(feeding.getFeeding().getTime());

    if (invalidFeedingTime) return true;

    const food = feeding.getFeeding().getFood();
    const invalidFood = StringUtil.isNullOrEmpty(food.getName()) || StringUtil.isNullOrEmpty(food.getType());

    return invalidFood;
  }

  /**
   * Method to build buildFoodTableItem from Food
   *
   * @param  {Food} food
   * @returns {FoodTable}
   */
  private static buildFoodTableItem(food: Food): FoodTable {
    return FoodTable.builder()
      .Name(food.getName())
      .Type(food.getType());
  }

  /**
   * Method to build FeedingTable from Feeding
   *
   * @param  {Feeding} feeding
   * @returns {FeedingTable}
   */
  private static buildFeedingTableItem(feeding: FeedingDTO): FeedingTable {
    return FeedingTable.builder()
      .FoodName(feeding.getFood().getName())
      .QuantityKilos(feeding.getQuantityKilos())
      .Time(feeding.getTime())
      .Location(feeding.getLocation())
      .build();
  }

  /**
   * Method to build AnimalFeedingTable
   *
   * @param  {string} feedingId
   * @param  {User} user
   * @param  {Animal} animal
   * @returns {AnimalFeedingTable}
   */
  private static buildAnimalFeedingTableItem(feedingId: string, user: User, animal: Animal): AnimalFeedingTable {
    return AnimalFeedingTable.builder()
      .FeedingId(feedingId)
      .UserId(user.getEmail())
      .AnimalName(animal.getName())
      .AnimalQuantity(animal.getQuantity())
      .build();
  }

  /**
   * Method to build Feeding from FeedingTable and Food
   *
   * @param  {FeedingTable} feedingItem
   * @param  {Food} food
   * @returns {Feeding}
   */
  private static buildFeedingFrom(feedingItem: FeedingTable, food: Food): Feeding {
    return new Feeding(
      feedingItem.getId(),
      food,
      feedingItem.getTime(),
      feedingItem.getLocation(),
      feedingItem.getQuantityKilos()
    );
  }

  /**
   * Method to return if error was caused by user not found
   *
   * @param  {Error} error
   * @returns {boolean}
   */
  private static errorByUserNotFound(error: any): boolean {
    const message = error ? error.message : '';
    return message.includes('violates foreign key constraint "fk_user"');
  }
}
