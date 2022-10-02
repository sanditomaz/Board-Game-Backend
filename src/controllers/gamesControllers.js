import { connection } from "../database/database.js";

async function insertGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  console.log(req.body);
  const query = connection.query(
    `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
    [name, image, stockTotal, categoryId, pricePerDay]
  );

  res.sendStatus(201);
}

async function listGames(req, res) {
  try {
    const gamesList = await connection.query("SELECT * FROM games");

    res.send(gamesList.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { insertGame, listGames };
