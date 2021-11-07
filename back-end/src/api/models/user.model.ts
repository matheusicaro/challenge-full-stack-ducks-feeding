export default class User {
  private email: string;
  private name: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }
}
