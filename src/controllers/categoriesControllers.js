import { connection } from "../database/database.js";

async function insertCategory(req, res) {
  const { name } = req.body;

  const query = connection.query("INSERT INTO categories (name) VALUES ($1);", [
    name,
  ]);

  res.sendStatus(201);
}

async function listCategories(req, res) {
  try {
    const categoryList = await connection.query("SELECT * FROM categories");

    res.send(categoryList.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { insertCategory, listCategories };
