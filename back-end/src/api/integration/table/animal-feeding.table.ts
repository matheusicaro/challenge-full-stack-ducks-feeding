/* eslint-disable @typescript-eslint/camelcase */

/**
 * Animal_feeding Database Table Representation Model
 */
export default class AnimalFeedingTable {
  private id: string;
  private animal_name: string;
  private animal_quantity: number;
  private feeding_id: string;
  private user_id: string;

  constructor(data: any) {
    this.id = data['id'];
    this.animal_name = data['animal_name'];
    this.animal_quantity = data['animal_quantity'];
    this.feeding_id = data['feeding_id'];
    this.user_id = data['user_id'];
  }

  public static builder(): AnimalFeedingTable {
    return new AnimalFeedingTable({});
  }

  public AnimalName(animaName: string): AnimalFeedingTable {
    this.animal_name = animaName;
    return this;
  }

  public AnimalQuantity(animalQuantity: number): AnimalFeedingTable {
    this.animal_quantity = animalQuantity;
    return this;
  }

  public FeedingId(feedingId: string): AnimalFeedingTable {
    this.feeding_id = feedingId;
    return this;
  }

  public UserId(userId: string): AnimalFeedingTable {
    this.user_id = userId;
    return this;
  }

  public build(): AnimalFeedingTable {
    return new AnimalFeedingTable({
      animal_name: this.animal_name,
      animal_quantity: this.animal_quantity,
      feeding_id: this.feeding_id,
      user_id: this.user_id
    });
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
}
