import express from "express"
import userRoutes from "./routes/users.mjs"
import { logging } from "./middlewares/logging.mjs"
const app = express()

app.use(express.json())

app.use(logging)

app.use("/api", userRoutes)


app.listen(3000, () => console.log("Listening to port 3000"))
