const mongoose = require("mongoose")
const { Schema } = mongoose;
const {ObjectId} = Schema; 


const ProductCartSchema = new Schema({
    product: {
        type: ObjectId, 
        ref: "Product"
    }, 
    name: String, 
    count: Number, 
    price: Number
}, {timestamps: true})


const orderSchema = new Schema({
    products: [ProductCartSchema],
    transaction_id: {

    },
    amount: {type: Number}, 
    address: String, 
    updated: Date, 
    user: {
        type: ObjectId, 
        ref: "User"
    }
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

module.exports = {Order, ProductCart};