/* eslint-disable @typescript-eslint/camelcase */

export default class FoodTable {
  private name: string;
  private type: string;

  constructor(data: any) {
    this.name = data['name'];
    this.type = data['type'];
  }

  public static builder(): FoodTable {
    return new FoodTable({});
  }

  public Name(name: string): FoodTable {
    this.name = name;
    return this;
  }

  public Type(type: string): FoodTable {
    this.type = type;
    return this;
  }

  public build(): FoodTable {
    return new FoodTable({
      name: this.name,
      type: this.type
    });
  }

  public getName(): string {
    return this.name;
  }

  public getType(): string {
    return this.type;
  }
}
