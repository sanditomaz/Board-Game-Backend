import express from "express";
import * as categoryController from "../controllers/categoriesControllers.js";

const router = express.Router();

router.post("/categories", categoryController.insertCategory);
router.get("/categories", categoryController.listCategories);

export default router;
