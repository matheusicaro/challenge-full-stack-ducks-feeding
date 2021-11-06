/*eslint no-undef: 0*/

import Service from '../../api/services/animal-feeding.service';

jest.mock('../../api/integration/database.integration');
import DatabaseIntegration from '../../api/integration/database.integration';
import AnimalFeedingDTO from '../../api/integration/dto/animal-feeding.dto';
import { User } from '../../api/models';
import AnimalFeeding, { Animal, AnimalEnum, Feeding, Food } from '../../api/models/animal-feeding.model';

describe("Check method 'getFeedings'", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return expected alimentation feeds in success case', async () => {
    const animal = AnimalEnum.DUCK;
    const dto = new AnimalFeedingDTO(
      'id',
      animal.toString(),
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
    );

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
