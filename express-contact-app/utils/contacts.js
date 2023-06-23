const fs = require('fs')

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
   return contacts.find((contact) => contact.nama == nama)
}

const checkDuplikat = (nama) => {
   const contacts = getContacts()
   const duplikat = contacts.find((contact) => contact.nama.toLowerCase() == nama.toLowerCase())
   if (duplikat) {
      return {
         message: "Nama sudah terpakai",
         status: 400
      }
   }
}

const addContact = ({ nama, email, nohp = null }) => {
   const contacts = getContacts()
   contacts.push({ nama, email, nohp })
   saveContacts(contacts)
   return true
}

const saveContacts = (contacts) => {
   fs.writeFile('data/contacts.json', JSON.stringify(contacts), () => { })
}

const deleteContact = (nama) => {
   const contacts = getContacts()
   const newContacts = contacts.filter((contact) => contact.nama !== nama)
   if (contacts === newContacts) {
      return false
   }
   saveContacts(newContacts)
   return true
}

module.exports = { getContacts, findContact, addContact, checkDuplikat, deleteContact }