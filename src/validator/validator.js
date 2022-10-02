import Joi from "joi";
const validator = (schema) => (payload) => schema.validate(payload);

const categoriesSchema = Joi.object({
  name: Joi.string().min(1).empty().required().messages({
    "string.min": "Name should be min 1 character",
    "string.empty": "Name cannot be an empty field",
    "any.required": "Name is required",
  }),
});

const customersSchema = Joi.object({
  name: Joi.string().min(1).empty().required().messages({
    "string.min": "Name should be min 1 character",
    "string.empty": "Name cannot be an empty field",
    "any.required": "Name is required",
  }),
  phone: Joi.string().min(10).max(11).required().messages({
    "string.min": "Phone should have 10 or 11 characters",
    "any.required": "Phone is required",
  }),
  cpf: Joi.string().min(11).max(11).required().messages({
    "string.min": "CPF should have min 11 characters",
    "any.required": "CPF is required",
  }),
  birthday: Joi.date().less("now").greater("01-01-1900").required().messages({
    "date.less": "Birthday should be before today",
    "date.greater": "Birthday should be over 01-01-1900",
    "any.required": "Birthday is required",
  }),
});

const gamesSchema = Joi.object({
  name: Joi.string().min(1).empty().required().messages({
    "string.min": "Name should be min 1 character",
    "string.empty": "Name cannot be an empty field",
    "any.required": "Name is required",
  }),
  image: Joi.string()
    .uri()
    .required()
    .messages({ "any.required": "Url is required" }),
  stockTotal: Joi.number()
    .positive()
    .required()
    .messages({ "any.required": "Number is required" }),
  categoryId: Joi.number()
    .required()
    .messages({ "any.required": "Id is required" }),
  pricePerDay: Joi.number()
    .positive()
    .required()
    .messages({ "any.required": "Price is required" }),
});

const rentalsSchema = Joi.object({
  customerId: Joi.number()
    .required()
    .messages({ "any.required": "Id is required" }),
  gameId: Joi.number()
    .required()
    .messages({ "any.required": "Id is required" }),
  daysRented: Joi.number()
    .required()
    .messages({ "any.required": "DaysRented is required" }),
});

const categoriesValidation = validator(categoriesSchema);
const customersValidation = validator(customersSchema);
const gamesValidation = validator(gamesSchema);
const rentalsValidation = validator(rentalsSchema);

export {
  categoriesValidation,
  customersValidation,
  gamesValidation,
  rentalsValidation,
};
