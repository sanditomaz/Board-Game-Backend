import { gamesValidation } from "../validator/validator.js";

const gameValidator = (req, res, next) => {
  const { error } = gamesValidation(req.body);
  if (error) return res.sendStatus(400);
  next();
};

export { gameValidator };
