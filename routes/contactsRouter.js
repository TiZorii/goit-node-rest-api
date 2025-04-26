import express from "express";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContactById,
  updateContactStatusById,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import isEmptyBody from '../middlewares/isEmptyBody.js';

const router = express.Router();

router.use(authenticate);

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.delete("/:id", deleteContact);
router.post("/", isEmptyBody, validateBody(createContactSchema), createContact);
router.put("/:id", isEmptyBody, validateBody(updateContactSchema), updateContactById);
router.patch("/:id/favorite", validateBody(updateFavoriteSchema), updateContactStatusById);

export default router;
