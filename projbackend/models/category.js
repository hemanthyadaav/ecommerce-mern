import mongoose from "mongoose";
const { Schema } = mongoose;


const categorySchema = new Schema({
    name: {
        type: String,
        trim: true, 
        required: true, 
        maxLength: 32, 
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema);