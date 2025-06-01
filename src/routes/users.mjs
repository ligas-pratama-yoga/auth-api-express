import { Router } from "express";
import UserController from "../controllers/userController.mjs";
import { checkSchema } from "express-validator";
import userSchema from "../schemas/userSchema.mjs";

const router = Router();

// Register

router.post("/users/register", checkSchema(userSchema.registerSchema), UserController.register)

// Login

router.post("/users/login", UserController.login)

// Logout

router.delete("/users/logout", UserController.logout)

// Update

router.patch("/users", UserController.update)

// Delete

router.delete("/users", UserController.remove)

export default router
