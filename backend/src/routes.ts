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
  changeOrderStatusController,
  createOrderController,
  getAllOrdersController,
  getOrderByEmailController,
} from "./controllers/orderController";
import {
  createAddressController,
  getAddressController,
} from "./controllers/addressController";
import { adminMiddleware } from "./middleware/admin";

export const router = express.Router();

// Rotas para Produtos

router.post("/products", adminMiddleware, createProductController);

router.get("/products", getAllProductsController);

router.delete("/products/:id", adminMiddleware, deleteProductByIdController);

router.put("/products/:id", adminMiddleware, updateProductByIdController);

// Rotas para Ingredientes e Adicionais fora do Menu

router.post("/ingredients", adminMiddleware, createIngredientsController);

router.get("/ingredients", getAllIngredientsController);

router.get("/ingredients/:type", getAllIngredientsByTypeController);

router.delete(
  "/ingredients/:id",
  adminMiddleware,
  deleteIngredientByIdController
);

router.put("/ingredients/:id", adminMiddleware, updateIngredientByIdController);

// Rotas para Criação e Login de Usuario

router.post("/user", UserController.createUser);

router.get("/users/getall", adminMiddleware, UserController.getAllUsers);

router.delete("/users/delete/:id", adminMiddleware, UserController.deleteUser);

router.post("/user/login", UserController.loginUser);

router.post("/user/loginGoogle", UserController.loginWithGoogle);

router.post("/user/admin", UserController.loginAdmin);

router.put("/user/login/:id", UserController.updateUser);

// Rotas para Pedidos

router.post("/orders", authMiddleware, createOrderController);

router.get("/orders/:email", authMiddleware, getOrderByEmailController);

router.get(
  "/orders",
  //  adminMiddleware,
  getAllOrdersController
);

router.put(
  "/order/:id",
  //  adminMiddleware,
  changeOrderStatusController
);

// Rota para Tabela de Endereços

router.post("/address/:email", authMiddleware, createAddressController);

router.get("/address/:email", authMiddleware, getAddressController);
