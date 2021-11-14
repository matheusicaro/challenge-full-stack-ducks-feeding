import Security from '../../config/security';
import { MESSAGES } from '../constants';
import ErrorResponse, { HttpStatusCode } from '../exceptions/error-response.exception';
import DatabaseIntegration from '../integration/database.integration';
import UserTable from '../integration/table/user.table';
import jwt from 'jsonwebtoken';
import environment from '../../config/environment';
import AuthToken from '../models/auth-token.model';
import { DateUtil, StringUtil } from '../utils';
import DatabaseIntegrationMocked from '../integration/mocks/database.integration.mock';

/**
 * Class for handling business rules for user services
 *
 */
export default class UserService {
  private static MESSAGE_USER_REGISTERED = 'User is already registered.';
  private static MESSAGE_INVALID_EMAIL_OR_PASSWORDD = 'Email or password is invalid.';

  private static databaseIntegration =
    environment.NODE_ENV === 'production/mocks' ? DatabaseIntegrationMocked : DatabaseIntegration;

  /**
   * Method to create a user in the database
   *
   * @param  {string} name:
   * @param  {string} email:
   * @param  {string} password:
   * @returns {Promise<void>}
   */
  public static async creatUser(name: string, email: string, password: string): Promise<void> {
    const user = await this.databaseIntegration.getUser(email);

    if (user && !StringUtil.isNullOrEmpty(user.getId())) {
      throw new ErrorResponse(
        `${MESSAGES.UNPROCESSABLE} ${this.MESSAGE_USER_REGISTERED}`,
        HttpStatusCode.UNPROCESSABLE
      );
    }

    const passwordEncrypted = await Security.encrypt(password);

    const newUser = UserTable.builder().Email(email).Password(passwordEncrypted).Name(name).build();

    this.databaseIntegration.saveUser(newUser);
  }

  /**
   * Method to get auth token
   *
   * @param  {string} email:
   * @param  {string} password:
   * @returns {Promise<void>}
   */
  public static async getAuthToken(email: string, password: string): Promise<AuthToken> {
    const user = await this.databaseIntegration.getUser(email);

    const invalidUser = !user || !(await Security.isSameHash(password, user.getPassword()));

    if (invalidUser) throw new ErrorResponse(this.MESSAGE_INVALID_EMAIL_OR_PASSWORDD, HttpStatusCode.UNAUTHORIZED);

    const expiryTime = DateUtil.convertToMilliseconds(environment.JWT_TOKEN_EXPIRY_TIME_IN_MINUTES);
    const expiresIn = Date.now() + expiryTime;

    const payload = { userId: user.getEmail() };
    const config: jwt.SignOptions = { expiresIn, noTimestamp: true };

    const token = await jwt.sign(payload, environment.JWT_TOKEN_SECRET, config);

    return new AuthToken(token, expiresIn, user.getName());
  }
}
