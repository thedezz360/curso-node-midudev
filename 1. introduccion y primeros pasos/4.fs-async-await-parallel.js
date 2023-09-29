const fs = require("node:fs/promises");

// ESTO SERIA UN EJEMPLO DE ASINCRONO PARALELO

//para poder utilizar await en el cuerpo del archivo en commonJs
//utilizamos una funcion autoinvocable
//IIFE - inmediatly invoked Function Expression

Promise.all([
	fs.readFile("./archivo.txt", "utf-8"),
	fs.readFile("./archivo2.txt", "utf-8")
]).then(([text, secondText]) =>{
	console.log("primer texto: ", text)
	console.log("segundo text: ", secondText)
}) 






