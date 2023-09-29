const fs = require("node:fs/promises")



console.log("leyendo el primer archivo")
const textAsyn = fs.readFile("./archivo.txt", "utf-8" )
	.then(text => {
		console.log("primer texto", text)
	})
console.log("hacer cosas mientras lee el primer archivo asincrono")

console.log("leyendo el segundo archivo")
const text2Asyn = fs.readFile("./archivo2.txt", "utf-8")
	.then(text => {
		console.log("segundo texto", text)
	})
console.log("hacer cosas mientras lee el segundo archivo asincrono ")
