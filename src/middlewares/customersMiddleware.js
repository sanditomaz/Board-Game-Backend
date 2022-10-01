import { customersValidation } from "../validator/validator.js";

const customerValidator = (req, res, next) => {
  const { error } = customersValidation(req.body);
  if (error) return res.sendStatus(400);
  next();
};

export { customerValidator };
