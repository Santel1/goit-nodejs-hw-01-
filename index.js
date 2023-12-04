const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contactById = await contacts.getContactById(id);
        if (contactById) {
          console.table([contactById]);
        } else {
          console.log("Contact not found.");
        }
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log("New contact added:");
        console.table([newContact]);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(id);
        if (removedContact) {
          console.log("Removed contact:");
          console.table([removedContact]);
        } else {
          console.log("Contact not found.");
        }
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("\x1B[31m Error:", error.message);
  }
}

invokeAction(argv);
