/*eslint no-undef: 0*/

import Service from '../../api/services/animal-feeding.service';

jest.mock('../../api/integration/database.integration');
import DatabaseIntegration from '../../api/integration/database.integration';
import AnimalFeedingDTO from '../../api/integration/dto/animal-feeding.dto';
import AnimalFeeding, { Animal, AnimalEnum, Feeding, Food } from '../../api/models/animal-feeding.model';
import exampleResponseAnimalFeedingDtoDatabase from '../json/example-response-animal-feeding-dto-database.json';
import { User } from '../../api/models';

describe("Test 'animal-feeding.service.ts'", () => {
  describe("Check method 'getFeedings'", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('Should return expected alimentation feeds in success case', async () => {
      const animal = AnimalEnum.DUCK;
      const dto = new AnimalFeedingDTO(exampleResponseAnimalFeedingDtoDatabase);

      const expected = [
        new AnimalFeeding(
          dto.getId(),
          new Date(dto.getCreatedAt()),
          new Animal(animal, dto.getAnimalQuantity()),
          new Feeding(
            dto.getFeedingId(),
            new Food(dto.getFoodName(), dto.getFoodType()),
            dto.getTime(),
            dto.getLocation(),
            dto.getQuantityKilos()
          ),
          new User(dto.getUserId(), dto.getUserName())
        )
      ];

      DatabaseIntegration.getFullRelationFeedingBy = jest.fn().mockImplementation(() => {
        return new Promise(resolve => {
          resolve([dto]);
        });
      });

      const returned = await Service.getFeedings(animal);

      expect(DatabaseIntegration.getFullRelationFeedingBy).toHaveBeenCalledTimes(1);
      expect(returned.length).toBe(1);
      expect(JSON.stringify(returned)).toEqual(JSON.stringify(expected));
    });
  });

  describe("Check method 'saveAnimalFeeding'", () => {
    test('should be returned expected AnimalFeeding built by items saved in the database ', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('Should be saved expected items in database built via AnimalFeedingDTO', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('Should be saved expected items in database built via AnimalFeedingDTO', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('DatabaseIntegration method "saveFood" should be called with params expected only 1 time', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('DatabaseIntegration method "saveFeeding" should be called with params expected only 1 time', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('DatabaseIntegration method "saveAnimalFeeding" should be called with params expected only 1 time', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('If object is invalid AnimalFeeding Must return error of ErrorResponse type with expected message and http status code 400', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('If there is an error saving items in the database It should return error of ErrorResponse type with expected message and http status code 422', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('If there is an error saving items in the database it should log error captured', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('If there is an error saving items in the database and error caused by user not found should return expected message', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });
});
