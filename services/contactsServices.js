import Contact from "../db/models/Contact.js";

export const listContacts = query => Contact.findAll({
  where: query
});
  
export const getContactById = id => Contact.findByPk(id);

export const getContact = query => Contact.findOne({
  where: query
})

export const addContact = data => Contact.create(data);
  
export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;
  return contact.update(data, {
    returning: true,
  })
}
  
export const removeContact = async (query) => {
  const contact = await getContact(query);
  if (!contact) return null;
  await Contact.destroy({ where: query });
  return contact;
}

export const updateStatusContact = async (id, body) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.update(body); 
  return contact;
}