/* eslint-disable @typescript-eslint/camelcase */
import { AnimalEnum } from '../../models/animal-feeding.model';
import AnimalFeedingDTO from '../dto/animal-feeding.dto';
import AnimalFeedingTable from '../table/animal-feeding.table';
import FeedingTable from '../table/feeding.table';
import FoodTable from '../table/food.table';
import UserTable from '../table/user.table';

/**
 * Class intended to return Animal Feeding services
 *
 */
export default class DatabaseIntegrationMocked {
  private static TOTAL_ITEMS = 10;

  private static userTable: Array<UserTable> = DatabaseIntegrationMocked.initiaUserTable();
  private static foodTable: Array<FoodTable> = DatabaseIntegrationMocked.initiaFoodTable();
  private static feedingTable: Array<FeedingTable> = DatabaseIntegrationMocked.initiaFeedingTable();
  private static animalFeedingTable: Array<AnimalFeedingTable> = DatabaseIntegrationMocked.initiaAnimalFeedingTable();

  public static async getFullRelationFeedingBy(animalName: AnimalEnum): Promise<Array<AnimalFeedingDTO>> {
    const buildAnimalFeedingDTO = (animalFeeding: AnimalFeedingTable): AnimalFeedingDTO => {
      const feeding = this.feedingTable.filter(e => e.getId() === animalFeeding.getFeedingId())[0];
      const food = feeding ? this.foodTable.filter(e => e.getName() === feeding.getFoodName())[0] : undefined;
      const user = this.userTable.filter(e => e.getId() === animalFeeding.getUserId())[0];
      return new AnimalFeedingDTO(null, animalFeeding, user, feeding, food);
    };

    return this.animalFeedingTable.filter(e => e.getAnimalName() === animalName).map(e => buildAnimalFeedingDTO(e));
  }

  public static async getUser(id: string): Promise<UserTable> {
    return this.userTable.filter(e => e.getId() === id)[0];
  }

  public static async saveUser(user: UserTable): Promise<void> {
    if (this.userTable.length === 10) {
      this.userTable.pop();
    }
    this.userTable.push(user);
  }

  public static async saveAnimalFeeding(animalFeeding: AnimalFeedingTable): Promise<AnimalFeedingTable> {
    if (this.animalFeedingTable.length === 20) {
      this.animalFeedingTable.pop();
    }

    const newAnimalFeeding = new AnimalFeedingTable({
      id: this.animalFeedingTable.length,
      animal_name: animalFeeding.getAnimalName(),
      animal_quantity: animalFeeding.getAnimalQuantity(),
      feeding_id: animalFeeding.getFeedingId(),
      user_id: animalFeeding.getUserId()
    });

    this.animalFeedingTable.push(newAnimalFeeding);

    return newAnimalFeeding;
  }

  public static async saveFeeding(feeding: FeedingTable): Promise<FeedingTable> {
    if (this.feedingTable.length === this.TOTAL_ITEMS) {
      this.feedingTable.pop();
    }

    const newFeeding = new FeedingTable({
      id: this.feedingTable.length,
      time: feeding.getTime(),
      location: feeding.getLocation(),
      quantity_kilos: feeding.getQuantityKilos(),
      food_name: feeding.getFoodName(),
      created_at: new Date().toJSON()
    });

    this.feedingTable.push(newFeeding);

    return newFeeding;
  }

  public static async saveFood(food: FoodTable): Promise<void> {
    if (this.foodTable.length === this.TOTAL_ITEMS) {
      this.foodTable.pop();
    }

    this.foodTable.push(food);
  }

  private static initiaUserTable(): Array<UserTable> {
    return [
      new UserTable({
        email: 'contact@matheusicaro.com',
        name: 'Matheus Icaro',
        password: 'mat.contact@matheusicaro.com',
        created_at: new Date().toJSON()
      })
    ];
  }

  private static initiaFoodTable(): Array<FoodTable> {
    return [
      {
        name: 'RICE',
        type: 'CEREAL'
      },
      {
        name: 'EARTHWORM',
        type: 'ANIMAL'
      },
      {
        name: 'CORN',
        type: 'CEREAL'
      },
      {
        name: 'GIRASSOL',
        type: 'PLANT'
      }
    ].map(e => new FoodTable(e));
  }

  private static initiaFeedingTable(): Array<FeedingTable> {
    const locales: Array<string> = [
      'Belo Horizonte, MG, Brazil',
      'Vancouver, BC, Canada',
      'Westminster Borough, London, United Kingdom',
      'Concha Espina, Madrid, Spain',
      'Rue du Commandant Guilbaud, Paris, France',
      'Piazzale Angelo Moratti, Milano, Italy',
      'Via Futebol Clube do Porto, Porto, Portugal',
      'Hennes Weisweiler Allee, Mönchengladbach, Germany',
      'Apopka, FL, USA',
      'Karlavägen, Stockholm, Sweden'
    ];

    const table = [];

    for (let i = 0; i < this.TOTAL_ITEMS; i++) {
      table.push(
        new FeedingTable({
          id: i,
          location: locales[i],
          time: this.getRandomTime(),
          created_at: this.randomDate(),
          quantity_kilos: this.getRandomInt(1, parseInt(`1${i}00`)),
          food_name: this.foodTable[this.getRandomInt(0, this.foodTable.length)].getName()
        })
      );
    }

    return table;
  }

  private static initiaAnimalFeedingTable(): Array<AnimalFeedingTable> {
    const table = [];

    for (let i = 0; i < this.TOTAL_ITEMS; i++) {
      const feeding = this.feedingTable[this.getRandomInt(0, this.foodTable.length)];

      table.push(
        new AnimalFeedingTable({
          id: i,
          animal_name: 'DUCK',
          animal_quantity: this.getRandomInt(1, parseInt(`1${i}00`)),
          feeding_id: feeding.getId(),
          user_id: this.userTable[0].getId()
        })
      );
    }

    return table;
  }

  private static getRandomTime(): string {
    const timeSplited = this.randomDate()
      .toLocaleTimeString('en-US')
      .split(':');

    const hour = timeSplited[0].length > 1 ? timeSplited[0] : `0${timeSplited[0]}`;
    const min = timeSplited[1].length > 1 ? timeSplited[1] : `0${timeSplited[1]}`;
    const meridianTime = timeSplited[2].split(' ')[1];

    return `${hour}:${min} ${meridianTime}`;
  }

  private static getRandomInt(min: number, max: number): number {
    const start = Math.ceil(min);
    const end = Math.floor(max);
    return Math.floor(Math.random() * (end - start) + start);
  }

  private static randomDate(start = new Date(2020, 0, 1), end = new Date()): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}