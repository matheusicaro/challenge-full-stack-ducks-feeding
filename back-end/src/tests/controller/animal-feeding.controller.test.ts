// @ts-nocheck

import { mockRequest, mockResponse } from './util';
import controller from '../../api/controllers/animal-feeding.controller';
import { AnimalFeeding, ApiResponse, User } from '../../api/models';
import { Animal, AnimalEnum, Feeding, Food } from '../../api/models/animal-feeding.model';
import { ErrorResponse, HttpStatusCode } from '../../api/exceptions';

jest.mock('../../config/logger');
import { Logger } from '../../config/logger';

jest.mock('../../api/services/animal-feeding.service');
import Service from '../../api/services/animal-feeding.service';
import { Request } from 'express';

describe("Check method 'getFeeding'", () => {
  const animalFeedings = [
    new AnimalFeeding(
      'id',
      'create_At',
      new Animal(AnimalEnum.DUCK, 1),
      new Feeding('id', new Food('name', 'type'), 'time', 'location', 1),
      new User('email', 'name')
    )
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return status code 200 and expected body', async () => {
    const expectedBody = animalFeedings;
    const headerParameReceived = 'DUCK';

    const response = mockResponse();

    Service.getFeedings = jest.fn().mockImplementation(() => {
      return expectedBody;
    });

    await controller.getFeeding(mockRequest(headerParameReceived), response);

    const bodyCaptured = response.json.mock.calls[0][0];

    expect(response.status).toHaveBeenCalledWith(200);
    expect(bodyCaptured).toEqual(expectedBody);
  });

  test('Service should be called with params expected only 1 time', async () => {
    const headerParameReceived = 'DUCK';

    await controller.getFeeding(mockRequest(headerParameReceived), mockResponse());

    expect(Service.getFeedings).toHaveBeenCalledTimes(1);
    expect(Service.getFeedings).toHaveBeenCalledWith(AnimalEnum.DUCK);
  });

  test('Should return 400 and the expected body if haader was not informed or invalid', async () => {
    const expectedBody = new ApiResponse('Required parameters is nissing or invalid');
    const expectedStatusCode = 400;

    const invalidsHeaderInput = [undefined, 'ANIMAL', 'nimal', 'animal'];

    for (const headerInput of invalidsHeaderInput) {
      const response = mockResponse();
      const request: Partial<Request> = {
        header: jest.fn().mockReturnValue(headerInput)
      };

      await controller.getFeeding(request, response);

      const responseBodyCaptured = response.json.mock.calls[0][0];

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(responseBodyCaptured).not.toBeUndefined();
      expect(responseBodyCaptured).toEqual(expectedBody);
    }
  });

  test('When any error is captured it must be logged.', async () => {
    const res = mockResponse();
    const error = new Error('error message');

    const mockImplementationsToThrowErrorWhenStatus200 = jest.fn().mockImplementation(statusCode => {
      if (statusCode === 200) throw error;
      return res;
    });

    res.status = mockImplementationsToThrowErrorWhenStatus200;

    await controller.getFeeding(mockRequest('DUCK'), res);

    const logger = jest.spyOn(Logger, 'error');

    const inputCaptured = logger.mock.calls[0][0];

    expect(logger.mock.calls.length).toEqual(1);
    expect(inputCaptured).toEqual(error);
  });

  test('Should return dynamic API Response when exception captured is of the type Error Response.', async () => {
    const res = mockResponse();
    const errorExpected = new ErrorResponse('Not found data', HttpStatusCode.NOT_FOUND);

    Service.getFeedings = jest.fn().mockImplementation(() => {
      throw errorExpected;
    });

    await controller.getFeeding(mockRequest('DUCK'), res);

    const logger = jest.spyOn(Logger, 'error');

    const responseBodyCaptured = res.json.mock.calls[0][0];

    expect(res.status).toHaveBeenCalledWith(errorExpected.statusCode);
    expect(responseBodyCaptured).not.toBeUndefined();
    expect(responseBodyCaptured.message).toEqual('Not found data');
    expect(logger.mock.calls.length).toEqual(0);
  });
});
