import { createPool } from "mysql2"

const pool = createPool({
  host: 'localhost',
  user: 'ligas',
  password: 'root',
  database: 'auth_api'
})

export default pool.promise()
