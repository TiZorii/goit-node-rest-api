import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }

  res.status(200).json(contact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);

  if (!deletedContact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }

  res.status(200).json(deletedContact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const data = req.body;
  const newContact = await addContact(data);

  res.status(201).json(newContact);
});

export const updateContactById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (Object.keys(data).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const updatedContact = await updateContact(id, data);

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
});

export const updateContactStatusById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    throw HttpError(400, "Missing field favorite");
  }

  const updatedContact = await updateStatusContact(id, { favorite });

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
});
