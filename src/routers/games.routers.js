import express from "express";
import { insertGame } from "../controllers/gamesControllers.js";
import { listGames } from "../controllers/gamesControllers.js";
import { gameValidator } from "../middlewares/gamesMiddleware.js";

const router = express.Router();

router.post("/games", gameValidator, insertGame);
router.get("/games", listGames);

export default router;
