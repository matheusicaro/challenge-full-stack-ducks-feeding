/*eslint no-undef: 0*/

describe("Test 'user.service.ts'", () => {
  describe("Check method 'creatUser'", () => {
    test('Should be saved expected user with input data', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('Should be saved user with password encrypted', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('DatabaseIntegration and Security.encrypt method should be called with params expected only 1 time', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('If user is already registered Should be returned error of ErrorResponse type with expected message and http status code 422', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'creatUser'", () => {
    test('Should be returned auth token if user is valid and database instance called with params expected only 1 time', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('Should be returned auth token with the expected expiry time from environment config', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('Should be singed jwt token with expected params from environment config', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('If user is invalid Should be returned error of ErrorResponse type with expected message and http status code 401', async () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });
});
