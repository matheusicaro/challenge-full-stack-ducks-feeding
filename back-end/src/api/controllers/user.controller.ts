import { Request, Response } from 'express';
import { Logger } from '../../config/logger';
import { MESSAGES } from '../constants';
import { ErrorResponse } from '../exceptions';
import { ApiResponse } from '../models';
import { UserService } from '../services';
import { StringUtil } from '../utils';

export default class UserController {
  /**
   * Method responsible for for handling requests of user registration service in the database
   *
   * more at: http://localhost:4000/api-docs/#/User/createUser
   *
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Response<void>> | Response<ApiResponse>}
   */
  public static async singup(req: Request, res: Response): Promise<Response<void>> {
    try {
      const userName = req.body['name'];
      const userEmail = req.body['email'];
      const userPassword = req.body['password'];

      const invalidInputs =
        StringUtil.isNullOrEmpty(userName) ||
        StringUtil.isNullOrEmpty(userEmail) ||
        StringUtil.isNullOrEmpty(userPassword);

      if (invalidInputs) return res.status(400).json(new ApiResponse(MESSAGES.INVALID_PARAMS));

      await UserService.creatUser(userName, userEmail, userPassword);

      return res.status(204).json({});
    } catch (error) {
      if (error instanceof ErrorResponse) return res.status(error.statusCode).json(new ApiResponse(error.message));

      Logger.error(error);
      return res.status(500).json(new ApiResponse(MESSAGES.INTERNAL_ERROR));
    }
  }
}
