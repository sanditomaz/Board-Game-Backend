import express from "express";
import * as rentalsControllers from "../controllers/rentalsControllers.js";

const router = express.Router();

router.post("/rentals", rentalsControllers.insertRent);
router.get("/rentals", rentalsControllers.listRent);
router.post("/rentals/:id/return", rentalsControllers.setRent);
router.delete("/rentals/:id", rentalsControllers.deleteRent);

export default router;
