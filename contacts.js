const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readContacts = JSON.parse(await fs.readFile(contactsPath));
    return readContacts;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const readContacts = JSON.parse(await fs.readFile(contactsPath));

    const contact = readContacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    let readContacts = JSON.parse(await fs.readFile(contactsPath));

    const contactIndex = readContacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const removedContact = readContacts.splice(contactIndex, 1)[0];

      await fs.writeFile(contactsPath, JSON.stringify(readContacts));
      return removedContact; // Возвращаем удаленный контакт
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: nanoid(),
      name: name,
      phone: phone,
      email: email,
    };
    const writeContacts = JSON.parse(await fs.readFile(contactsPath));

    writeContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(writeContacts));
    return newContact;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
