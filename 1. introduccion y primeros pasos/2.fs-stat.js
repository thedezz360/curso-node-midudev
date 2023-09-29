
const fs = require("node:fs")

//sincrono

const stats = fs.statSync("./archivo.txt")

console.log(
	stats.isFile(), // si es un fichero
	stats.isDirectory(), // si es un directorrio
	stats.isSymbolicLink(), // si es un archivo simbolico
	stats.size // tamaño en bytes
	)