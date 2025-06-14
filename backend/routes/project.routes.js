import { Router } from "express";
import { body } from "express-validator";
import * as projectController from '../controllers/project.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

const router = Router();

router.post('/create',
    authMiddleware.authUser,
    body("name").isString().withMessage("Name is required!"),
    projectController.createProjectController
);

router.get("/all", 
    authMiddleware.authUser,
    projectController.getAllProject
);

router.put("/add-user", 
    authMiddleware.authUser,
    body("projectId").isString().withMessage("Project ID is required and must be a string."),
    body("users").isArray({ min: 1 }).withMessage("Users must be a non-empty array.").custom((arr) => arr.every(u => typeof u === "string")).withMessage("Each user must be a string."),
    projectController.addUserToProject
);

router.get("/get-project/:projectId",
    authMiddleware.authUser,
    projectController.getProjectById
)

export default router;