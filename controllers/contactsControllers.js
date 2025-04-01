import { listContacts, getContactById, removeContact, addContact, updateContact } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

// Отримання списку всіх контактів
export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

// Отримання контакту за id
export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  
  if (!contact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  
  res.status(200).json(contact);
});

// Видалення контакту за id
export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);
  
  if (!deletedContact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  
  res.status(200).json(deletedContact);
});

// Додавання нового контакту
export const createContact = ctrlWrapper(async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  
  res.status(201).json(newContact);
});

// Оновлення контакту за id
export const updateContactById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  
  const updatedContact = await updateContact(id, body);
  
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  
  res.status(200).json(updatedContact);
});
