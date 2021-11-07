/*eslint no-undef: 0*/

import Integration from '../../api/integration/database.integration';
import AnimalFeedingDTO from '../../api/integration/dto/animal-feeding.dto';
import { AnimalEnum } from '../../api/models/animal-feeding.model';

jest.mock('../../config/database');
import DatabaseInstance from '../../config/database';

describe("Check method 'getFullRelationFeedingBy'", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be called the Database instance with expected query contain the input', async () => {
    const input = AnimalEnum.DUCK;
    const expected = `
        SELECT *, feeding.id AS feeding_id, food.type AS food_type, "user".name as user_name
        FROM animal_feeding
        INNER JOIN feeding ON animal_feeding.feeding_id = feeding.id
        INNER JOIN food ON feeding.food_name = food.name
        INNER JOIN "user" ON "user".email = animal_feeding.user_id
        WHERE animal_feeding.animal_name = ${input}
    `;

    await Integration.getFullRelationFeedingBy(AnimalEnum.DUCK);

    const instance = jest.spyOn(DatabaseInstance, 'query');
    const queryCaptured = instance.mock.calls[0][0];

    expect(queryCaptured).toEqual(expected);
  });

  test('Should return expected data and Database intance called only 1 time', async () => {
    const expectedData = [
      new AnimalFeedingDTO(
        'id',
        'DUCK',
        0,
        'created_at',
        'feed_id',
        'feeding_id',
        'food_name',
        'food_type',
        'location',
        0,
        'time',
        'user_id',
        'user_name'
      )
    ];

    DatabaseInstance.query = jest.fn().mockImplementation(() => {
      return new Promise(resolve => {
        resolve(expectedData);
      });
    });

    const returned = await Integration.getFullRelationFeedingBy(AnimalEnum.DUCK);

    expect(DatabaseInstance.query).toHaveBeenCalledTimes(1);
    expect(returned.length).toBe(1);
    expect(JSON.stringify(returned)).toEqual(JSON.stringify(expectedData));
  });
});
