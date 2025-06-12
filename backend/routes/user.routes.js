import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", 
    body("fullname.firstname").isLength({ min: 3}).withMessage("Firstname must be atleast 3 Character long"),
    body("fullname.lastname").isLength({ min: 3 }).withMessage("Lastname must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 characters long"),
    userController.createUserController
)

router.post("/login", 
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 characters long"),
    userController.loginController
)

router.get("/profile",
    authMiddleware.authUser,
    userController.profileController
)

router.post("/logout", 
    authMiddleware.authUser,
    userController.logoutController
)

router.get("/all", 
    authMiddleware.authUser,
    userController.getAllUserController
)

export default router;