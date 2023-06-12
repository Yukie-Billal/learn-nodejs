const fs = require('fs')
const validator = require('validator')

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath)
}

const filePath = './data/contacts.json'
if (!fs.existsSync(filePath)) {
   fs.writeFileSync(filePath, "[]", 'utf-8')
}

const getContacts = () => {
   const contacts = fs.readFileSync("data/contacts.json", "utf-8")
   return JSON.parse(contacts);
}

const findContact = (nama) => {
   let contacts = getContacts()
   return contacts.find((contact)=> contact.nama == nama)
}

const addContact = ({nama, email, nohp = null}) => {
   const contacts = getContacts()
   const duplikat = contacts.find((contact) => contact.nama.toLowerCase() == nama.toLowerCase())
   if (duplikat) {
      return false
   }
   if (!validator.isEmail(email)) {
      return false
   }
   if (nohp) {
      if (!validator.isMobilePhone(nohp)) {
         return false
      }
   }
   contacts.push({nama,email,nohp})
   fs.writeFile('data/contacts.json', JSON.stringify(contacts), () => {})
   return true
}
module.exports = { getContacts, findContact, addContact }