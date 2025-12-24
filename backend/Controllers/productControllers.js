import mongoose from "mongoose";
import Product from "../Model/model.js";

export const getProducts = async (req, res) => {

    try {
        const productList = await Product.find({});
        if (!productList) {
            return res.status(404).send({ success: false, message: "No products found" });
        }
        res.status(200).send({ success: true, data: productList });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).send({ success: false, message: `Error in fetching products: ${error.message}` });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.imageUrl) {
        res.status(400).send({ message: "All fields are required" });
        return;
    }

    try {
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(200).send({ success: true, message: "Product created successfully!", data: newProduct });
        console.log(newProduct);
    } catch (error) {
        res.status(400).send({ success: false, message: "Error in product creation" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in deleting product: ${error.message}` });
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ success: false, message: "Invalid product ID" });
    }
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).send({ success: true, data: updateProduct });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in updating product: ${error.message}` });
    }

}