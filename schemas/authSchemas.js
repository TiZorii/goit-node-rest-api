import Joi from "joi";

import { emailRegexp } from "../constants/auth.js";

export const authRegesterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": "Enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least {#limit} characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": "Enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least {#limit} characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});