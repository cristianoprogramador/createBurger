import express from "express";
import multer from "multer";
import { authMiddleware } from "./middleware/auth";
import {
  createProductController,
  deleteProductByIdController,
  getAllProductsController,
  updateProductByIdController,
} from "./controllers/productsController";
import {
  createIngredientsController,
  deleteIngredientByIdController,
  getAllIngredientsController,
  getAllIngredientsByTypeController,
  updateIngredientByIdController,
} from "./controllers/ingredientsController";
import UserController from "./controllers/userController";
import {
  createOrderController,
  getOrderByEmailController,
} from "./controllers/orderController";
import {
  createAddressController,
  getAddressController,
} from "./controllers/addressController";

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

// Rotas para Produtos

router.post("/products", createProductController);

router.get("/products", getAllProductsController);

router.delete("/products/:id", deleteProductByIdController);

router.put("/products/:id", updateProductByIdController);

// Rotas para Ingredientes e Adicionais fora do Menu

router.post("/ingredients", createIngredientsController);

router.get("/ingredients", getAllIngredientsController);

router.get("/ingredients/:type", getAllIngredientsByTypeController);

router.delete("/ingredients/:id", deleteIngredientByIdController);

router.put("/ingredients/:id", updateIngredientByIdController);

// Rotas para Criação e Login de Usuario

router.post("/user", UserController.createUser);

router.post("/user/login", UserController.loginUser);

router.post("/user/loginGoogle", UserController.loginWithGoogle);

router.put("/user/login/:id", UserController.updateUser);

// Rotas para Pedidos

router.post("/orders", createOrderController);

router.get("/orders/:email", getOrderByEmailController);

// Rota para Tabela de Endereços

router.post("/address/:email", createAddressController);

router.get("/address/:email", getAddressController);
