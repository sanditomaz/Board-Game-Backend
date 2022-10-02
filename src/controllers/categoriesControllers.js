import { connection } from "../database/database.js";

async function insertCategory(req, res) {
  const { name } = req.body;

  const query = connection.query("INSERT INTO categories (name) VALUES ($1);", [
    name,
  ]);

  console.log(name);
  res.send("oksss");
}

async function listCategories(req, res) {
  res.send("ya");
}

export { insertCategory, listCategories };
