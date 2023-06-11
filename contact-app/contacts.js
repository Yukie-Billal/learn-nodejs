const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')
const readline = require('readline');
const { stdin, stdout } = require('process');

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath)
}

const filePath = './data/contacts.json'
if (!fs.existsSync(filePath)) {
   fs.writeFileSync(filePath, "[]", 'utf-8')
}

const getContacts = () => {
   let contacts = fs.readFileSync("data/contacts.json", "utf-8")
   return JSON.parse(contacts);
}

const saveContact = (name, email, noHp) => {
   contacts = getContacts()
   const duplikat = contacts.find((contact) => contact.name == name)
   if (duplikat) {
      console.log(
         write("Contact name is already in use", 'error')
      )
      return false
   }
   if (email) {
      if (!validator.isEmail(email)) {
         console.log(
            write("Email is not valid", 'error')
         )
         return false
      }
   }
   if (!validator.isMobilePhone(noHp, 'id-ID')) {
      console.log(
         write("Phone Number is not valid", 'error')
      );
      return false
   }

   contacts.push({ name, email, noHp })
   fs.writeFile("data/contacts.json", JSON.stringify(contacts), () => { })
   console.log(write(`Terima kasih, No HP ${noHp} disimpan sebagai ${name}`, 'success'))
}

const listContacts = () => {
   const contacts = getContacts()
   chalk.bgBlueBright.bold.whiteBright("Daftar Kontak")
   contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.name} - ${contact.noHp}`)
   })
}

const getSameContacts = (name) => {
   const contacts = getContacts()
   let sameContacts = [];
   let i = 1;

   console.log(`\nWe have same name in our records : \n`)
   contacts.forEach((contact) => {
      if (contact.name.toLowerCase() == name.toLowerCase()) {
         console.log(`${i}. ${contact.name}`);
         contact.no = i++;
         sameContacts.push(contact)
      }
   });
   return sameContacts;
}

const write = (message, type) => {
   switch (type) {
      case 'error':
         return chalk.red.bold(message)
         break;
      case 'success':
         return chalk.greenBright.bold(message)
         break;
      case 'warning':
         return chalk.yellow.bold(message)
         break;

      default:
         break;
   }
}

const detailContact = (name) => {
   const contacts = getContacts()
   let contact = contacts.find((contact) => contact.name === name)
   if (!contact) {
      let contact = contacts.find((contact) => contact.name.toLowerCase() == name.toLowerCase())
      if (contact) {
         console.log(
            write(` ${name} is not available in our records`, 'warning')
         );
         const rl = readline.createInterface({
            input: stdin,
            output: stdout
         })
         rl.question(`\n are you means ${contact.name} ? (yes) `, (e) => {
            e == '' ? e = 'y' : ''
            if (e == 'yes' || e == 'y') {
               console.log(
                  `\nName : ${contact.name}\nNo Hp : ${contact.noHp}\nEmail : ${contact.email ? contact.email : 'Not Have an Email'}`
               );
            } else {
               getSameContacts(name)
            }
            rl.close();
         })
      } else {
         console.log(
            write(`${name} is not available in our contacts records`, 'error')
         );
      }
      return false
   }
   console.log(
      `Name : ${contact.name}\nNo Hp : ${contact.noHp}\nEmail : ${contact.email ? contact.email : 'Not Have an Email'}`
   );
}

const deleteContact = (name) => {
   const contacts = getContacts()
   const newContacts = contacts.filter(
      (contact) => contact.name !== name
   )

   if (contacts.length === newContacts.length) {
      console.log(
         chalk.red.bold(`Contact ${name} is not found.`)
      )
      return false
   }
   fs.writeFile("data/contacts.json", JSON.stringify(newContacts), () => { })
   console.log(
      write(`Contact ${name} is succesfuly deleted`, 'success')
   )
}

module.exports = { saveContact, listContacts, detailContact, deleteContact }