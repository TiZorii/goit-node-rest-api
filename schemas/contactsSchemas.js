import Joi from "joi";

// Схема для створення нового контакту (всі поля обов'язкові)
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "name is required and cannot be empty",
    "any.required": "name field is required",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "email is required and cannot be empty",
    "string.email": "email must be a valid email address",
    "any.required": "email field is required",
  }),

  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.empty": "phone is required and cannot be empty",
      "string.pattern.base": "phone must be in format (XXX) XXX-XXXX",
      "any.required": "phone field is required",
    }),
});

// Схема для оновлення контакту (жодне поле не є обов'язковим)
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.empty": "name cannot be empty",
  }),

  email: Joi.string().email().messages({
    "string.empty": "email cannot be empty",
    "string.email": "email must be a valid email",
  }),

  phone: Joi.string()
    .pattern(/^\+?\d{10,15}$/)
    .messages({
      "string.empty": "phone cannot be empty",
      "string.pattern.base": "phone must be in format (XXX) XXX-XXXX",
    }),
});