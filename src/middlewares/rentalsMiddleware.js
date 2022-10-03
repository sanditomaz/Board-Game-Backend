import { rentalsValidation } from "../validator/validator.js";
import { connection } from "../database/database.js";

const rentValidator = async (req, res, next) => {
  const validate = rentalsValidation(req.body, {
    abortEarly: false,
  });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    res.status(400).send(errors);
    return;
  }
  const { customerId, gameId, daysRented } = req.body;
  try {
    const isClient = await connection.query(
      "SELECT * FROM customers WHERE id = ($1);",
      [customerId]
    );

    if (isClient.rows.length == 0) {
      return res.status(400).send("User not found");
    }

    const isGame = await connection.query(
      "SELECT * FROM games WHERE id = ($1);",
      [gameId]
    );

    if (isGame.rows.length === 0) {
      return res.status(400).send("Game not found");
    }
  } catch {
    res.sendStatus(500);
  }

  if (daysRented <= 0) {
    res.status(400).send("Number must be greater than 0");
    return;
  }

  next();
};

export { rentValidator };
