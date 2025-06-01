import pool from "./../config/database.mjs"

const create = (body) => {
  const { username, password } = body

  return pool.execute("insert into users(username, password) values(?, ?)", [username, password])
}

export default {
  create
}
