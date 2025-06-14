import { matchedData } from "express-validator"
import UsersModel from "../models/usersModel.mjs"
import { v4 as uuid4 } from "uuid"
import bcrypt from "bcrypt"
import { abort } from "../utils/functions.mjs"

const register = async (request, response) => {
  const token = uuid4()
  const data = { ...matchedData(request), token }
  const [rows] = await UsersModel.findUsername(data.username)

  if (rows.length != 0) {
    abort(response, 409, "Username already exists")
  }

  try {
    await UsersModel.create(data)
    response.status(201).json({
      token: token
    })
  } catch (err) {
    response.status(500).json({
      msg: "SERVER ERROR",
    })
  }
}

const login = async (request, response) => {
  const token = uuid4()
  try {
    const data = matchedData(request)

    const findUser = await UsersModel.findUsernameOrAbort(response, data.username)
    bcrypt.compare(data.password, findUser[0][0].password).then(async (result) => {
      if(!result) return abort(response, 400, "Wrong username or password")
      await UsersModel.addToken(findUser[0][0].id, token)

      response.json({
        token: token
      })
    })
  } catch (err) {
    response.status(500).json({
      msg: "SERVER ERROR",
      serverMsg: err
    })
  }
}

const logout = async (request, response) => {
  try {
    const tokenRequest = request.headers.authorization
    const data = matchedData(request)
    const [findUser] = (await UsersModel.findBy("id", data.id))[0]

    if (tokenRequest != findUser.token) {
      return abort(response, 401, "NOT AUTHORIZED")
    }

    await UsersModel.removeToken(request.body.id)

    response.json({
      msg: "Sucess"
    })
  } catch (err) {
    response.status(500).json({
      msg: "SERVER ERROR",
      serverMsg: err
    })
  }
}

const update = async (request, response) => {
  try {
    const tokenRequest = request.headers.authorization
    const data = matchedData(request)
    const [findUser] = (await UsersModel.findBy("id", data.id))[0]

    if(findUser == {}){
      abort(response, 404, "NOT FOUND")
    }

    if (tokenRequest != findUser.token) {
      return abort(response, 401, "NOT AUTHORIZED")
    }
    await UsersModel.update(data)
    response.json({
      msg: "Sucess"
    })
  } catch (err) {
    response.status(500).json({
      msg: "SERVER ERROR",
      serverMsg: err
    })
  }
}

const remove = async (request, response) => {
  try {
    const tokenRequest = request.headers.authorization
    const data = matchedData(request)
    const [findUser] = (await UsersModel.findBy("id", data.id))[0]

    if(findUser.length == 0){
      abort(response, 404, "NOT FOUND")
    }

    if (tokenRequest != findUser.token) {
      return abort(response, 401, "NOT AUTHORIZED")
    }
    await UsersModel.deleteUser(data.id)

    response.json({
      msg: "Sucess"
    })
  } catch (err) {
    response.status(500).json({
      msg: "SERVER ERROR",
      serverMsg: err
    })
  }
}

export default {
  register,
  login,
  logout,
  update,
  remove
}
