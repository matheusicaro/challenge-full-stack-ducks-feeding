/* eslint-disable @typescript-eslint/camelcase */

/**
 * user Database Table Representation Model
 */
export default class UserTable {
  private email: string;
  private name: string;
  private password: string;
  private created_at: string;

  constructor(data: any) {
    const dataReceived = data || {};
    this.email = dataReceived['email'];
    this.name = dataReceived['name'];
    this.password = dataReceived['password'];
    this.created_at = dataReceived['created_a'];
  }

  public static builder(): UserTable {
    return new UserTable({});
  }

  public Email(email: string): UserTable {
    this.email = email;
    return this;
  }

  public Name(name: string): UserTable {
    this.name = name;
    return this;
  }

  public Password(password: string): UserTable {
    this.password = password;
    return this;
  }

  public CreatedAt(createdAt: string): UserTable {
    this.created_at = createdAt;
    return this;
  }

  public build(): UserTable {
    return new UserTable({
      email: this.email,
      name: this.name,
      password: this.password,
      created_at: this.created_at
    });
  }

  public getId(): string {
    return this.email;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getPassword(): string {
    return this.password;
  }

  public createdAt(): string {
    return this.created_at;
  }
}
