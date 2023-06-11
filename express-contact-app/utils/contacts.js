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
   let contacts = fs.readFileSync("data/contacts.json", "utf-8")
   return JSON.parse(contacts);
}

module.exports = { getContacts }