const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
})

console.log(fs.readdirSync('data'));

rl.question("Masukkan nama : ", (nama) => {
   rl.question("Masukkan no hp : ", (noHp) => {
      let contacts = fs.readFileSync("data/contacts.json", "utf-8");
      contacts = JSON.parse(contacts);
      contacts.push({ nama, noHp });
      fs.writeFile("data/contacts.json", JSON.stringify(contacts), (e) => {
         console.log(e);
      })
      console.log(`Terima kasih, No hp ${noHp} disimpan sebagai ${nama}`);
      rl.close()
   });
});



