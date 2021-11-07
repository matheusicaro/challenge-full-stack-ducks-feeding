/* eslint-disable @typescript-eslint/camelcase */

import { User } from '..';
import { Animal, AnimalEnum, Food } from '../animal-feeding.model';

export class FeedingDTO {
  private food: Food;
  private time: string;
  private location: string;
  private quantity_kilos: number;

  constructor(data: any) {
    const dataReceived = data || {};
    const food = dataReceived['food'] || {};

    this.food = new Food(food['name'], food['type']);
    this.time = dataReceived['time'];
    this.location = dataReceived['location'];
    this.quantity_kilos = dataReceived['quantity_kilos'];
  }

  public getFood(): Food {
    return this.food;
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
}

export default class AnimalFeedingDTO {
  private animal: Animal;
  private feeding: FeedingDTO;
  private user: User;

  constructor(data: any) {
    const dataReceived = data ? data : {};
    const animal = dataReceived['animal'] || {};
    const user = dataReceived['user'] || {};

    this.animal = new Animal(AnimalEnum[animal['name'] as AnimalEnum], animal['quantity']);
    this.feeding = new FeedingDTO(dataReceived['feeding']);
    this.user = new User(user['email'], user['name']);
  }

  public getFeeding(): FeedingDTO {
    return this.feeding;
  }

  public getAnimal(): Animal {
    return this.animal;
  }

  public getUser(): User {
    return this.user;
  }
}
