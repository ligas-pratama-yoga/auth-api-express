const registerSchema = {
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
}

export default {
  registerSchema,
}
