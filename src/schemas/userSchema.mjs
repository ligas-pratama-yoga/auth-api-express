const userValidationSchema = {
  "/users/register": {
    username: {
      isLength: {
        options: { min: 3 },
        errorMessage: "Username must be at least 3 characters long!"
      }
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: "Password must be at least 8 characters long!"
      }
    }
  },
  "/users/login": {
    username: {
      notEmpty: {
        errorMessage: "Username cannot be empty!"
      }
    },
    password: {
      notEmpty: {
        errorMessage: "Password cannot be empty!"
      }
    }
  },
  "/users/logout": {
    "Authorization": {
      in: ['headers'],
      errorMessage: "Authorization header is missing or invalid",
      isString: true,
      notEmpty: true,
    },
    id: {
      notEmpty: {
        errorMessage: "ID cannot be empty!"
      }
    }
  },
  "/users": {
    "Authorization": {
      in: ['headers'],
      errorMessage: "Authorization header is missing or invalid",
      isString: true,
      notEmpty: true,
    },
    id: {
      notEmpty: {
        errorMessage: "ID cannot be empty!"
      },
    },
    username: {
      notEmpty: false,
    },
    password: {
      notEmpty: false,
    },

  }
}

export default userValidationSchema
