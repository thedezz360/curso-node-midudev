const fs = require("node:fs/promises");

// ESTO SERIA UN EJEMPLO DE ASINCRONO SECUENCIAL

//para poder utilizar await en el cuerpo del archivo en commonJs
//utilizamos una funcion autoinvocable
//IIFE - inmediatly invoked Function Expression
(
	async()=>{
		console.log("leyendo el primer archivo")
		const text = await fs.readFile("./archivo.txt", "utf-8")
		console.log("primer texto", text)
		console.log("hacer cosas mientras lee el primer archivo asincrono")


		console.log("leyendo el segundo archivo")
		const text2 = await fs.readFile("./archivo2.txt", "utf-8")
		console.log("segundo Texto", text2)
		console.log("hacer cosas mientras lee el segundo archivo asincrono ")


})()


