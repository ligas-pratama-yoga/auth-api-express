import { Router } from "express";
import UserController from "../controllers/userController.mjs";
import { validateUser } from "../middlewares/validation.mjs"

const router = Router();

router.use(validateUser)

// Register

router.post(
  "/users/register",
  UserController.register
)

// Login

router.post(
  "/users/login",
  UserController.login
)

// Logout

router.delete(
  "/users/logout",
  UserController.logout
)

// Update

router.patch(
  "/users",
  UserController.update
)

// Delete

router.delete(
  "/users",
  UserController.remove
)

export default router
