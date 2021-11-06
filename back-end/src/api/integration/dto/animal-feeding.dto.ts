/* eslint-disable @typescript-eslint/camelcase */

export default class AnimalFeedingDTO {
  private id: string;
  private animal_name: string;
  private animal_quantity: number;
  private created_at: string;
  private feed_id: string;
  private feeding_id: string;
  private food_name: string;
  private food_type: string;
  private location: string;
  private quantity_kilos: number;
  private time: string;
  private user_id: string;
  private user_name: string;

  constructor(
    id: string,
    animal_name: string,
    animal_quantity: number,
    created_at: string,
    feed_id: string,
    feeding_id: string,
    food_name: string,
    food_type: string,
    location: string,
    quantity_kilos: number,
    time: string,
    user_id: string,
    user_name: string
  ) {
    this.id = id;
    this.animal_name = animal_name;
    this.animal_quantity = animal_quantity;
    this.created_at = created_at;
    this.feed_id = feed_id;
    this.feeding_id = feeding_id;
    this.food_name = food_name;
    this.food_type = food_type;
    this.location = location;
    this.quantity_kilos = quantity_kilos;
    this.time = time;
    this.user_id = user_id;
    this.user_name = user_name;
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

  public getFeedId(): string {
    return this.feed_id;
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
