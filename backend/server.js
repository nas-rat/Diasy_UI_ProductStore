import express, { Router } from 'express'
import mongoose from 'mongoose';
import productRoutes from './Routes/productRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000

// Vite build folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//connecting to Mongodb compass
mongoose.connect('mongodb://0.0.0.0:27017/DaisyProduct')
    .then(() => console.log("mongodb compass is connected"))
    .catch((err) => console.log(`Error in connection to database: ${err}`));

app.use('/api/products', productRoutes)


// Serve frontend (only in production)
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendPath));

    // Catch-all to serve index.html for any unknown route
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`the server is running on http://localhost:${PORT}/`);
})