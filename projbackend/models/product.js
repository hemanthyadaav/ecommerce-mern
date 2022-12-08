import mongoose from "mongoose";
const { Schema } = mongoose;
const {ObjectId} = Schema; 

const productSchema = new Schema({
    name: {
        type: String, 
        trim: true, 
        required: true, 
        maxLength: 32
    }, 
    description: {
        type: String, 
        trim: true, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true, 
        trim: true
    }, 
    category: {
        type: ObjectId, 
        ref: "Category", 
        required: true
    }, 
    stock: {
        type: Number, 
    }, 
    sold: {
        type: Number, 
        default: 0
    }, 
    photo: {
        data: Buffer, 
        contentType: String
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);
