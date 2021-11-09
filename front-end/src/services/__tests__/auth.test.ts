describe("Test 'auth.ts'", () => {
  describe("Check method 'getTokenInLocalStorage'", () => {
    test('should get token with expected key name', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('should delete token and return null if any error is caught', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'isTokenExpired'", () => {
    test('deveria retornar verdadeiro se tempo de expiração da token informada nao for maior que data atual', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'isAuthenticated'", () => {
    test('should return true if token is saved in local storage and is not expired', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
    test('should return false if token is not saved in local storage', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('should return false if token is not valid and expired', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'getToken'", () => {
    test('should return token from local storage', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'logout'", () => {
    test('should delet token from local storage', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'saveToken'", () => {
    test('should save token into local storage with expected value', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'saveToken'", () => {
    test('should save user into local storage with expected value', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });

  describe("Check method 'getUser'", () => {
    test('should get token with expected key name', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });

    test('should delete token and return null if any error is caught', () => {
      /**
       * TODO: missing test due to lack of developer time
       */
    });
  });
});
