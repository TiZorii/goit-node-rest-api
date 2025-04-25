import Contact from "../db/models/Contact.js";

export const listContacts = () => Contact.findAll();
  
export const getContactById = id => Contact.findByPk(id);

export const addContact = data => Contact.create(data);
  
export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  })
}
  
export const removeContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  await Contact.destroy({ where: { id } });
  return contact;
}

export const updateStatusContact = async (id, body) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.update(body); 
  return contact;
}