import { categoriesValidation } from "../validator/validator.js";
import { connection } from "../database/database.js";

const categoryValidator = async (req, res, next) => {
  const validate = categoriesValidation(req.body, {
    abortEarly: false,
  });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    res.status(400).send(errors);
    return;
  }

  const { name } = req.body;

  try {
    const isName = await connection.query(
      "SELECT * FROM categories WHERE name=($1);",
      [name]
    );

    if (isName.rows[0]) return res.status(409).send("Name already exists");
  } catch (error) {
    res.sendStatus(500);
  }

  next();
};

export { categoryValidator };
