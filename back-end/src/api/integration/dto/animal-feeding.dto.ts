/* eslint-disable @typescript-eslint/camelcase */

import AnimalFeedingTable from '../table/animal-feeding.table';
import FeedingTable from '../table/feeding.table';
import FoodTable from '../table/food.table';
import UserTable from '../table/user.table';

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

  constructor(
    data: any,
    animalFeeding?: AnimalFeedingTable,
    user?: UserTable,
    feeding?: FeedingTable,
    food?: FoodTable
  ) {
    const dataReceived = data || {};

    this.id = dataReceived['id'] ? dataReceived['id'] : animalFeeding ? animalFeeding.getId() : '';

    this.user_id = dataReceived['user_id'] ? dataReceived['user_id'] : user ? user.getId() : '';
    this.user_name = dataReceived['user_name'] ? dataReceived['user_name'] : user ? user.getName() : '';

    this.feeding_id = dataReceived['feeding_id'] ? dataReceived['feeding_id'] : feeding ? feeding.getId() : '';
    this.created_at = dataReceived['created_at'] ? dataReceived['created_at'] : feeding ? feeding.getCreatedAt() : '';
    this.time = dataReceived['time'] ? dataReceived['time'] : feeding ? feeding.getTime() : '';
    this.location = dataReceived['location'] ? dataReceived['location'] : feeding ? feeding.getLocation() : '';
    this.quantity_kilos = dataReceived['quantity_kilos']
      ? dataReceived['quantity_kilos']
      : feeding
      ? feeding.getQuantityKilos()
      : '';

    this.food_name = dataReceived['food_name'] ? dataReceived['food_name'] : food ? food.getName() : '';
    this.food_type = dataReceived['food_type'] ? dataReceived['food_type'] : food ? food.getType() : '';

    this.animal_quantity = dataReceived['animal_quantity']
      ? dataReceived['animal_quantity']
      : animalFeeding
      ? animalFeeding.getAnimalQuantity()
      : '';

    this.animal_name = dataReceived['animal_name']
      ? dataReceived['animal_name']
      : animalFeeding
      ? animalFeeding.getAnimalQuantity()
      : '';
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