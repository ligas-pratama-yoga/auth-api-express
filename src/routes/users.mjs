import { Router } from "express";

const router = Router();

// Register

router.post("/users/register", (request, response) => {
  response.json({
    token: "unique-token"
  })
})

// Login

router.post("/users/login", (request, response) => {
  response.json({
    token: "unique-token"
  })
})

// Logout

router.delete("/users/logout", (request, response) => {
  response.json({
    msg: "Sucess"
  })
})

// Update

router.patch("/users", (request, response) => {
  response.json({
    username: "newligas"
  })
})

// Delete

router.delete("/users", (request, response) => {
  response.json({
    msg: "Sucess"
  })
})

export default router
