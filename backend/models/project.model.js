import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },

    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})

const projectModel = mongoose.model('project', projectSchema);

export default projectModel;