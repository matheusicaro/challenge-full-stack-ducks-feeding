/* eslint-disable @typescript-eslint/camelcase */

/**
 * Abstraction model for join data between Animal Feeding and Feeding Table tables.
 */
export default class AnimalFeedingDTO {
  private id: string;
  private animal_name: string;
  private animal_quantity: number;
  private created_at: string;
  private feeding_id: string;
  private food_name: string;
  private food_type: string;
  private location: string;
  private quantity_kilos: number;
  private time: string;
  private user_id: string;
  private user_name: string;

  constructor(data: any) {
    const dataReceied = data || {};

    this.id = dataReceied['id'];
    this.animal_quantity = dataReceied['animal_quantity'];
    this.animal_name = dataReceied['animal_name'];
    this.feeding_id = dataReceied['feeding_id'];
    this.user_id = dataReceied['user_id'];
    this.created_at = dataReceied['created_at'];
    this.time = dataReceied['time'];
    this.location = dataReceied['location'];
    this.quantity_kilos = dataReceied['quantity_kilos'];
    this.food_name = dataReceied['food_name'];
    this.food_type = dataReceied['food_type'];
    this.user_name = dataReceied['user_name'];
  }

  public getId(): string {
    return this.id;
  }

  public getAnimalName(): string {
    return this.animal_name;
  }

  public getAnimalQuantity(): number {
    return this.animal_quantity;
  }

  public getFeedingId(): string {
    return this.feeding_id;
  }

  public getUserId(): string {
    return this.user_id;
  }

  public getUserName(): string {
    return this.user_name;
  }

  public getCreatedAt(): string {
    return this.created_at;
  }

  public getTime(): string {
    return this.time;
  }

  public getLocation(): string {
    return this.location;
  }

  public getQuantityKilos(): number {
    return this.quantity_kilos;
  }

  public getFoodName(): string {
    return this.food_name;
  }

  public getFoodType(): string {
    return this.food_type;
  }
}
