import userModel from "../models/user.model.js";

export const createUser = async ({ fullname ,email, password }) => {
    if(!fullname || !email || !password){
        throw new Error("All fields are required");
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword
    })

    return user;
}