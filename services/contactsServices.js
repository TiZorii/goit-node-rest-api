import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

// Get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Шлях до файлу contacts.json
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

/**
 * Отримання списку всіх контактів
 * @returns {Promise<Array>} Масив контактів
 */
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
    return [];
  }
}

/**
 * Отримання контакту за id
 * @param {string} contactId - ID контакту
 * @returns {Promise<Object|null>} Об'єкт контакту або null
 */
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error.message);
    return null;
  }
}

/**
 * Видалення контакту за id
 * @param {string} contactId - ID контакту
 * @returns {Promise<Object|null>} Об'єкт видаленого контакту або null
 */
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    
    if (index === -1) {
      return null;
    }
    
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    
    return removedContact;
  } catch (error) {
    console.error("Error removing contact:", error.message);
    return null;
  }
}

/**
 * Додавання нового контакту
 * @param {string} name - Ім'я контакту
 * @param {string} email - Email контакту
 * @param {string} phone - Телефон контакту
 * @returns {Promise<Object|null>} Об'єкт нового контакту або null
 */
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    
    // Генерація унікального ID
    const id = crypto.randomUUID();
    
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error.message);
    return null;
  }
}

/**
 * Оновлення контакту за id
 * @param {string} contactId - ID контакту
 * @param {Object} updatedFields - Об'єкт з полями для оновлення
 * @returns {Promise<Object|null>} Оновлений об'єкт контакту або null
 */
async function updateContact(contactId, updatedFields) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    
    if (index === -1) {
      return null;
    }
    
    // Оновлення контакту, зберігаючи існуючі поля, якщо вони не передані
    contacts[index] = { ...contacts[index], ...updatedFields };
    
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    
    return contacts[index];
  } catch (error) {
    console.error("Error updating contact:", error.message);
    return null;
  }
}

export { listContacts, getContactById, removeContact, addContact, updateContact };