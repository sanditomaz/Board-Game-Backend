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
  const { name } = req.query;
  let gamesList;

  try {
    if (name) {
      gamesList = await connection.query(
        `SELECT games.* , categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name ILIKE '${name}%';`
      );
    } else {
      gamesList = await connection.query(
        `SELECT games.* , categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;`
      );
    }
    res.send(gamesList.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { insertGame, listGames };
