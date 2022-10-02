import { gamesValidation } from "../validator/validator.js";
import { connection } from "../database/database.js";

const gameValidator = async (req, res, next) => {
  const validate = gamesValidation(req.body, {
    abortEarly: false,
  });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    res.status(400).send(errors);
    return;
  }

  try {
    const { categoryId, name } = req.body;

    const checkId = await connection.query(
      "SELECT * FROM categories WHERE id=($1);",
      [categoryId]
    );

    if (checkId.rows.length === 0)
      return res.status(400).send("Category does not exist");

    const checkGame = await connection.query(
      "SELECT * FROM games WHERE name=($1);",
      [name]
    );

    if (checkGame.rows[0]) return res.status(409).send("Name already exists");

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

export { gameValidator };
