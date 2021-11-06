import { Request, Response } from 'express';
import { Logger } from '../../config/logger';
import { MESSAGES } from '../constants';
import { ErrorResponse } from '../exceptions';
import { ApiResponse, Health } from '../models';
import AnimalFeeding, { AnimalEnum } from '../models/animal-feeding.model';
import { AnimalFeedingService } from '../services/';

export default class AnimalFeedingController {
  /**
   * Method responsible for returning animal feedings through the animal's type
   *
   * more at: http://localhost:4000/api-docs/#/Animal%20feeding/getAnimalFeeding
   *
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Array<AnimalFeeding>> | Response<ApiResponse>}
   */
  public static async getFeeding(req: Request, res: Response): Promise<Response<Array<AnimalFeeding>>> {
    try {
      const animalType = AnimalEnum[req.header('animal') as keyof typeof AnimalEnum];

      if (!animalType) return res.status(400).json(new ApiResponse(MESSAGES.INVALID_PARAMS));

      const feedings = await AnimalFeedingService.getFeedings(animalType);

      return res.status(200).json(feedings);
    } catch (error) {
      if (error instanceof ErrorResponse) return res.status(error.statusCode).json(new ApiResponse(error.message));

      Logger.error(error);
      return res.status(500).json(new Health('FAILED', new Date()));
    }
  }
}
