/* eslint-disable @typescript-eslint/camelcase */

export default class AuthToken {
  private token: string;
  private expires_in: number;

  constructor(token: string, expiresIn: number) {
    this.token = token;
    this.expires_in = expiresIn;
  }
}
