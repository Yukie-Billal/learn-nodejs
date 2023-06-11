const yargs = require("yargs")
const { saveContact, listContacts, detailContact, deleteContact } = require("./contacts")

yargs.command({
   command: 'add',
   describe: 'Add new Contact',
   builder: {
      name: {
         describe: "Full Name",
         demandOption: true,
         type: 'string'
      },
      email: {
         describe: "Email",
         demandOption: false,
         type: 'string'
      },
      noHP: {
         describe: "Handphone Number",
         demandOption: true,
         type: 'string'
      }
   },
   handler(argv) {
      saveContact(argv.name, argv.email, argv.noHP);
   }
}).demandCommand()

yargs.command({
   command: 'list',
   describe: 'Get all list of contacts',
   handler() {
      listContacts()
   }
})
yargs.command({
   command: 'detail',
   describe: 'Get detail of contact',
   builder: {
      name: {
         describe: "Full Name",
         demandOption: true,
         type: 'string'
      }
   },
   handler(argv) {
      detailContact(argv.name)
   }
})
yargs.command({
   command: 'delete',
   describe: 'delete contact',
   builder: {
      name: {
         describe: "Full Name",
         demandOption: true,
         type: 'string'
      }
   },
   handler(argv) {
      deleteContact(argv.name)
   }
})

yargs.parse()