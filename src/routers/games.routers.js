import express from "express";
import * as gameControllers from "../controllers/gamesControllers.js";

const router = express.Router();

router.post("/games", gameControllers.insertGame);
router.get("/games", gameControllers.listGames);

export default router;
