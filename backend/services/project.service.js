import projectModel from "../models/project.model.js";

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