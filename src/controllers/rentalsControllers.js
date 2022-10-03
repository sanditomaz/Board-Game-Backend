import { connection } from "../database/database.js";
import dayjs from "dayjs";

async function insertRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const isGame = await connection.query(
      "SELECT * FROM games WHERE id = ($1);",
      [gameId]
    );

    const rentDate = dayjs().format("YYYY-MM-DD");
    const price = isGame.rows[0].pricePerDay * daysRented;

    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5);`,
      [customerId, gameId, rentDate, daysRented, price]
    );

    res.send("okaaaaa");
  } catch (error) {
    res.sendStatus(500);
  }
}

async function listRent(req, res) {
  const { customerId, gameId } = req.query;
  let rentals;

  try {
    if (customerId) {
      rentals = await connection.query(
        `SELECT rentals.*, json_build_object('id', customers.id,
    'name', customers.name) AS customer,
    json_build_object(
     'id', games.id,
     'name', games.name,
     'categoryId', games."categoryId",
     'categoryName', categories.name) 
     AS game FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON categories.id = games."categoryId" WHERE "customerId" = $1;`,
        [customerId]
      );
    }

    if (gameId) {
      rentals = await connection.query(
        `SELECT rentals.*, json_build_object('id', customers.id,
        'name', customers.name) AS customer,
        json_build_object(
         'id', games.id,
         'name', games.name,
         'categoryId', games."categoryId",
         'categoryName', categories.name) 
         AS game FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON categories.id = games."categoryId" WHERE "gameId" = $1;`,
        [gameId]
      );
    }

    rentals = await connection.query(
      `SELECT rentals.*, json_build_object('id', customers.id,
        'name', customers.name) AS customer,
        json_build_object(
         'id', games.id,
         'name', games.name,
         'categoryId', games."categoryId",
         'categoryName', categories.name) 
         AS game FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON categories.id = games."categoryId"`
    );
    res.send(rentals.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function setRent(req, res) {}

async function deleteRent(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(404).send("Insert an id");
  }

  try {
    const isId = await connection.query(
      `SELECT * FROM rentals WHERE id = ($1);`,
      [id]
    );
    console.log(isId.rows[0].returnDate);
    if (isId.rows.length === 0) {
      return res.status(404).send("Id not found");
    }

    if (isId.rows[0].returnDate === null) {
      return res.status(400).send("Rent not returned");
    }

    await connection.query("DELETE FROM rentals WHERE id = ($1);", [id]);

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
}

export { insertRent, listRent, setRent, deleteRent };
