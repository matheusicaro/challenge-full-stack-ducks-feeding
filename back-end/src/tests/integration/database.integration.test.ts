/*eslint no-undef: 0*/

import { QueryResult } from 'pg';
import Integration from '../../api/integration/database.integration';
import AnimalFeedingDTO from '../../api/integration/dto/animal-feeding.dto';
import { AnimalEnum } from '../../api/models/animal-feeding.model';

import exampleResponseAnimalFeedingDtoDatabase from '../json/example-response-animal-feeding-dto-database.json';

jest.mock('../../config/database');
import DatabaseInstance from '../../config/database';

describe("Check method 'getFullRelationFeedingBy'", () => {
  let getMockedReturnQueryWith: <T>(data: Array<T>) => Promise<QueryResult<T>>;

  beforeEach(() => {
    jest.clearAllMocks();

    getMockedReturnQueryWith = <T>(data: Array<T>): Promise<QueryResult<T>> => {
      return new Promise<QueryResult<T>>(resolve => {
        resolve({
          rows: data,
          command: '',
          rowCount: 1,
          oid: 1,
          fields: []
        });
      });
    };
  });

  test('Should be called the Database instance with expected query contain the input', async () => {
    const input = AnimalEnum.DUCK;
    const expected = `
        SELECT *, feeding.id AS feeding_id, food.type AS food_type, "user".name as user_name
        FROM animal_feeding
        INNER JOIN feeding ON animal_feeding.feeding_id = feeding.id
        INNER JOIN food ON feeding.food_name = food.name
        INNER JOIN "user" ON "user".email = animal_feeding.user_id
        WHERE animal_feeding.animal_name = '${input}'
    `;

    DatabaseInstance.query = jest.fn().mockImplementation(() => getMockedReturnQueryWith([]));

    await Integration.getFullRelationFeedingBy(AnimalEnum.DUCK);

    const instance = jest.spyOn(DatabaseInstance, 'query');
    const queryCaptured = instance.mock.calls[0][0];

    expect(queryCaptured).toEqual(expected);
  });

  test('Should return expected data and Database intance called only 1 time', async () => {
    const expectedData = [new AnimalFeedingDTO(exampleResponseAnimalFeedingDtoDatabase)];

    DatabaseInstance.query = jest.fn().mockImplementation(() => getMockedReturnQueryWith(expectedData));

    const returned = await Integration.getFullRelationFeedingBy(AnimalEnum.DUCK);

    expect(DatabaseInstance.query).toHaveBeenCalledTimes(1);
    expect(returned.length).toBe(1);
    expect(JSON.stringify(returned)).toEqual(JSON.stringify(expectedData));
  });
});
