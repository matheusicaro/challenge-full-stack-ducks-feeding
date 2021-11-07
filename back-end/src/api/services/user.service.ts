import Security from '../../config/security';
import { MESSAGES } from '../constants';
import ErrorResponse, { HttpStatusCode } from '../exceptions/error-response.exception';
import DatabaseIntegration from '../integration/database.integration';
import UserTable from '../integration/table/user.table';

/**
 * Class for handling business rules for user services
 *
 */
export default class UserService {
  private static USER_REGISTERED = 'User is already registered.';

  /**
   * Method to create a user in the database
   *
   * @param  {string} name:
   * @param  {string} email:
   * @param  {string} password:
   * @returns {Promise<void>}
   */
  public static async creatUser(name: string, email: string, password: string): Promise<void> {
    const user = await DatabaseIntegration.getUser(email);

    if (user) {
      throw new ErrorResponse(`${MESSAGES.UNPROCESSABLE} ${this.USER_REGISTERED}`, HttpStatusCode.UNPROCESSABLE);
    }

    const passwordEncrypted = await Security.encrypt(password);

    const newUser = UserTable.builder()
      .Email(email)
      .Password(passwordEncrypted)
      .Name(name)
      .build();

    DatabaseIntegration.saveUser(newUser);
  }
}
