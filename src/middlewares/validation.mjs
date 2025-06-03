import userSchema from "../schemas/userSchema.mjs"
import { checkSchema, validationResult } from "express-validator"
import { abort } from "./../utils/functions.mjs"

export const validateUser = async (req, res, next) => {
  const schema = userSchema[req.path]

  if(!schema)
    next()

  await checkSchema(schema).run(req)
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const responseError = result.array()
    let isAuthorization = false

    let errors = {}

    responseError.some(e => {
      errors[e.path] = e.msg
      if(e.location == "headers"){
        errors = {}
        isAuthorization = true
        errors[e.path] = e.msg
        return true
      }
    })

    return abort(res, (isAuthorization) ? 401:400, {
      title: "Invalid request body value or header value",
      errors: errors
    })
  }
  next()
}
