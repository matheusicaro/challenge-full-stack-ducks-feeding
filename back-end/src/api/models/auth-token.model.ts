/* eslint-disable @typescript-eslint/camelcase */

export default class AuthToken {
  private token: string;
  private expires_in: number;
  private user_name: string;

  constructor(token: string, expiresIn: number, userName: string) {
    this.token = token;
    this.expires_in = expiresIn;
    this.user_name = userName;
  }
}
