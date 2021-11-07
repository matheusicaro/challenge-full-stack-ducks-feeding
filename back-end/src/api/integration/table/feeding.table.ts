/* eslint-disable @typescript-eslint/camelcase */

export default class FeedingTable {
  private id: string;
  private time: string;
  private location: string;
  private created_at: string;
  private quantity_kilos: number;
  private food_name: string;

  constructor(data: any) {
    this.id = data['id'];
    this.time = data['time'];
    this.location = data['location'];
    this.created_at = data['created_at'];
    this.quantity_kilos = Number.parseFloat(data['quantity_kilos']);
    this.food_name = data['food_name'];
  }

  public static builder(): FeedingTable {
    return new FeedingTable({});
  }

  public Time(time: string): FeedingTable {
    this.time = time;
    return this;
  }

  public Location(location: string): FeedingTable {
    this.location = location;
    return this;
  }

  public QuantityKilos(quantity_kilos: number): FeedingTable {
    this.quantity_kilos = quantity_kilos;
    return this;
  }

  public FoodName(FoodName: string): FeedingTable {
    this.food_name = FoodName;
    return this;
  }

  public build(): FeedingTable {
    return new FeedingTable({
      time: this.time,
      location: this.location,
      quantity_kilos: this.quantity_kilos,
      food_name: this.food_name
    });
  }

  public getId(): string {
    return this.id;
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

  public getCreatedAt(): string {
    return this.created_at;
  }
}
