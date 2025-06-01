import { matchedData } from "express-validator"
import UsersModel from "../models/usersModel.mjs"
import { validationResult } from "express-validator"

const register = async (request, response) => {
  const result = validationResult(request)

  if(!result.isEmpty()) {
    const responseError = result.array()

    let errors = {}

    responseError.forEach(e => {
      errors[e.path] = e.msg
    })

    return response.status(400).json({
      title: "Invalid request body value",
      errors: errors
    })
  }

  try {
    const data = matchedData(request)
    await UsersModel.create(data)
    response.status(201).json({
      token: 'unique-token'
    })
  } catch(err) {
    console.log(err)
    response.status(500).json({
      msg: "SERVER ERROR",
    })
  }

}

const login = (request, response) => {
  const result = validationResult(request)

  if(!result.isEmpty()) {
    const responseError = result.array()

    let errors = {}

    responseError.forEach(e => {
      errors[e.path] = e.msg
    })

    return response.status(400).json({
      title: "Invalid request body value",
      errors: errors
    })
  }
  response.json({
    token: "unique-token"
  })
}

const logout = (request, response) => {
  response.json({
    msg: "Sucess"
  })
}

const update = (request, response) => {
  response.json({
    username: "newligas"
  })
}

const remove = (request, response) => {
  response.json({
    msg: "Sucess"
  })
}

export default {
  register,
  login,
  logout,
  update,
  remove
}
