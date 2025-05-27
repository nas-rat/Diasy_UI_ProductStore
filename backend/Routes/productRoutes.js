import { Router } from "express";
import express from "express";
import Product from "../Model/model.js";
import { createProduct, getProducts, deleteProduct, updateProduct } from "../Controllers/productControllers.js";

const router = Router();
router.use(express.json());

router.get("/", getProducts);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);

export default router;