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
)

export default router;