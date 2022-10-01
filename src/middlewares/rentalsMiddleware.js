import { rentalsValidation } from "../validator/validator.js";

const rentValidator = (req, res, next) => {
  const { error } = rentalsValidation(req.body);
  if (error) return res.sendStatus(400);
  next();
};

export { rentValidator };
