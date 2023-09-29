const fs = require("node:fs")


//sincrono
console.log("sincrono")
console.log("-----------------------")
console.log("leyendo el primer archivo")
const text = fs.readFileSync("./archivo.txt", "utf-8")

console.log(text)

console.log("leyendo el segundo archivo")
const text2 = fs.readFileSync("./archivo2.txt", "utf-8")

console.log(text2)

//asincrono
console.log("asincrono")
console.log("------------------------")

console.log("leyendo el primer archivo")
const textAsyn = fs.readFile("./archivo.txt", "utf-8" , (err, text) => {
	
	console.log(textAsyn)

})
console.log("hacer cosas mientras lee el primer archivo asincrono")

console.log("leyendo el segundo archivo")
const text2Asyn = fs.readFile("./archivo2.txt", "utf-8", (err, text)=> {

	console.log(text2Asyn)

})
console.log("hacer cosas mientras lee el segundo archivo asincrono ")
