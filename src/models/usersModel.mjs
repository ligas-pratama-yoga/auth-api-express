import pool from "./../config/database.mjs"
import { abort } from "./../utils/functions.mjs"

const addToken = (id, token) => {
  return pool.execute("update users set token = ? where id = ?", [token, id])
}

const removeToken = (id) => {
  return pool.execute("update users set token = null where id = ?", [id])
}

const create = (body) => {
  const { username, password, token } = body

  return pool.execute("insert into users(username, password, token) values(?, ?, ?)", [username, password, token])
}

const findUsername = (username) => {
  return pool.execute("select * from users where username=?", [username])
}

const findUsernameOrAbort = async (response, username) => {
  const result = await findUsername(username)
  if (result[0]?.length == 0) {
    abort(response, 404, "NOT FOUND")
    return
  }
  return result
}

const findBy = (key, value) => {
  return (pool.execute(`select * from users where ${key} = ?`, [value]))
}

const update = (data) => {
  let updateData = ""

  for(let key in data){
    if( key == "authorization" || key == "id" || data[key] == undefined) continue
    updateData += ` ${key} = '${data[key]}', `
  }

  updateData = updateData.replace(/\,\s+$/, '')
  
  return pool.execute(`update users set ${updateData} where id = ?`, [data.id])
}

const deleteUser = (id) => {
  return pool.execute("delete from users where id = ?", [id])
}


export default {
  addToken,
  removeToken,
  create,
  findUsername,
  findUsernameOrAbort,
  findBy,
  update,
  deleteUser
}
