// const getuserSync = (id) => {
//    let nama = id === 1 ? "Yukie" : "Billal";
//    return { id, nama };
// }

// const userSatu = getuserSync(1)
// console.log(userSatu);

// const userDua = getuserSync(2)
// console.log(userDua);

// const coba = 'Hello World';
// console.log(coba);

const getUser = (id, callback) => {
   const time = id === 1 ? 2000 : 1000;
   setTimeout(() => {
      let nama = id === 1 ? "Yukie" : "Billal";
      callback({ id, nama });
   }, time);
}

const userSatu = getUser(1, hasil => console.log(hasil));

const userDua = getUser(2, hasil => console.log(hasil));

const coba = 'Hello World';
console.log(coba);

function siap() {
   console.log("modulars")
}

module.exports = siap;