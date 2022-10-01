import express from "express";
import { insertRent } from "../controllers/rentalsControllers.js";
import { listRent } from "../controllers/rentalsControllers.js";
import { setRent } from "../controllers/rentalsControllers.js";
import { deleteRent } from "../controllers/rentalsControllers.js";
import { rentValidator } from "../middlewares/rentalsMiddleware.js";

const router = express.Router();

router.post("/rentals", rentValidator, insertRent);
router.get("/rentals", listRent);
router.post("/rentals/:id/return", rentValidator, setRent);
router.delete("/rentals/:id", deleteRent);

export default router;
