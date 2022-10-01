import { categoriesValidation } from "../validator/validator.js";

const categoryValidator = (req, res, next) => {
  const { error } = categoriesValidation(req.body);
  if (error) return res.sendStatus(400);
  next();
};

export { categoryValidator };
