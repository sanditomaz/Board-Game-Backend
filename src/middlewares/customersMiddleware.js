import { connection } from "../database/database.js";
import { customersValidation } from "../validator/validator.js";

const customerValidator = async (req, res, next) => {
  const validate = customersValidation(req.body, {
    abortEarly: false,
  });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    res.status(400).send(errors);

    return;
  }

  console.log(validate.error);

  try {
    const { cpf } = req.body;

    const checkCpf = await connection.query(
      "SELECT * FROM customers WHERE cpf=($1);",
      [cpf]
    );

    if (checkCpf.rows[0]) return res.status(409).send("CPF already exists");

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateValidator = async (req, res, next) => {
  const validate = customersValidation(req.body, {
    abortEarly: false,
  });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    res.status(400).send(errors);
    return;
  }

  next();
};

export { customerValidator, updateValidator };
