import express from "express";
import { insertCategory } from "../controllers/categoriesControllers.js";
import { listCategories } from "../controllers/categoriesControllers.js";
import { categoryValidator } from "../middlewares/categoriesMiddleware.js";

const router = express.Router();

router.post("/categories", categoryValidator, insertCategory);
router.get("/categories", listCategories);

export default router;
