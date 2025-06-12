import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProject = async ({
    name, userId
}) => {
    
    if(!name){
        throw new Error("Name is required");
    }

    if(!userId){
        throw new Error("UserId is required");
    }

    const project = await projectModel.create({
        name,
        users: [userId]
    })

    return project;
}

export const getAllProjectByUserId = async ({ userId }) => {
    
    if(!userId){
        throw new Error("User Id is required");
    }

    const allUserProject = await projectModel.find({
        users: userId
    })

    return allUserProject;
}

export const addUserToProjectService = async ({ projectId, users, userId}) => {
    if(!projectId){
        throw new Error("ProjectId is required!");
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid ProjectId. Must be a valid Mongoose ObjectId.");
    }
    if(!users){
        throw new Error("Users are required");
    }
    if(!Array.isArray(users)) {
        throw new Error("Users must be an array");
    }
    for (const userId of users) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error(`Invalid userId: ${userId}. Must be a valid Mongoose ObjectId.`);
        }
    }

    if(!userId){
        throw new Error("UserId is required!");
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid UserId");
        
    }
    
    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    if(!project){
        throw new Error("User doesn't belong to the project");
    }

    const updatedProject = await projectModel.findByIdAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject;
}

export const getProjectByIdService = async ({ projectId }) => {
    if(!projectId){
        throw new Error("projectId is required");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid ProjectId");
    }    const project = await projectModel.findOne({
        _id: projectId
    }).populate("users")

    return project;
}