/* eslint-disable @typescript-eslint/camelcase */

import { User } from '.';

export enum AnimalEnum {
  DUCK = 'DUCK'
}

export class Animal {
  private name: AnimalEnum;
  private quantity: number;

  constructor(name: AnimalEnum, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}

export class Food {
  private name: string;
  private type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

export class Feeding {
  private id: string;
  private food: Food;
  private time: string;
  private location: string;
  private quantity_kilos: number;

  constructor(id: string, food: Food, time: string, location: string, quantityKilos: number) {
    this.id = id;
    this.food = food;
    this.time = time;
    this.location = location;
    this.quantity_kilos = quantityKilos;
  }
}

export default class AnimalFeeding {
  private id: string;
  private created_at: Date;
  private animal: Animal;
  private feeding: Feeding;
  private user: User;

  constructor(id: string, createdAt: Date, animal: Animal, feeding: Feeding, user: User) {
    this.id = id;
    this.created_at = createdAt;
    this.animal = animal;
    this.feeding = feeding;
    this.user = user;
  }
}
