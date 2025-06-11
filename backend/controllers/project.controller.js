import projectModel from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator"

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user || !req.user.email) {
        return res.status(401).json({ message: "Unauthorized: user info missing" });
    }

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });

        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found in DB" });
        }

        const userId = loggedInUser._id;
        const newProject = await projectService.createProject({ name, userId });

        return res.status(201).json(newProject);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
};

export const getAllProject = async (req, res) => {
    if (!req.user || !req.user.email) {
        return res.status(401).json({ message: "Unauthorized: user info missing" });
    }
    try {
        const loggedInUser = await userModel.findOne({
            email: req.user.email
        });

        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found in DB" });
        }

        const allProjectUsers = await projectService.getAllProjectByUserId({
            userId: loggedInUser._id
        });

        return res.status(200).json({
            projects: allProjectUsers
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
}

export const addUserToProject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, users } = req.body;

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const project = await projectService.addUserToProjectService({
            projectId,
            users, 
            userId: loggedInUser._id
        })

        return res.status(200).json({
            project
        })
        
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message })
    }
}