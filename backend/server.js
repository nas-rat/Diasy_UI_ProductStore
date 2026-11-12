
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./Routes/productRoutes.js";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const app = express();

app.use(express.json());

// Allow the local Vite frontend to communicate with Express.
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:3000"
    }));
}

// Connect to MongoDB before handling API requests.
app.use("/api", async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// Product API routes
app.use("/api/products", productRoutes);

// Run a local server only during development.
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

export default app;
