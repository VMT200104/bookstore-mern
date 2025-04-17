import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cors from "cors";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json({ limit: '5mb' }));  
app.use(express.urlencoded({ limit: '5mb', extended: true }));  
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({
  origin: ["https://bookstore-mern-1-5sr8.onrender.com", "http://localhost:3000"],
  credentials: true,
}));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is working");
});

import userRoutes from "./routes/UserRoute.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("Server is running in development mode");
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
