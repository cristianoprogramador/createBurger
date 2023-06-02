import express from "express";
import multer from "multer";
import {
  createProductController,
  deleteProductByIdController,
  getAllProductsController,
  updateProductByIdController,
} from "./controllers/productsController";

export const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now().toString() + "_" + file.originalname);
  },
});
const uploadPhoto = multer({ storage: storage });

router.post("/products", createProductController);

router.get("/products", getAllProductsController);

router.delete("/products/:id", deleteProductByIdController);

router.put("/products/:id", updateProductByIdController);
