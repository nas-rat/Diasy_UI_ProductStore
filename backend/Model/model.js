import mongoose, { Schema } from "mongoose";


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

const Product = mongoose.model("DaisyProduct", ProductSchema);
export default Product;