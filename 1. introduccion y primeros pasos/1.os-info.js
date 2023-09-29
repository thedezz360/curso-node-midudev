const os = require("node:os")

console.log("informacion sobre el sistema operativo:")
console.log("-----------------------------")

console.log("nombre del sistema operativo: ", os.platform())
console.log("Versión del sistema operativo: ", os.release())
console.log("Arquitectura ", os.arch())
console.log("cpus", os.cpus())
console.log("Memoria Libre", os.freemem() / 1024 / 1024)
console.log("Memoria total" , os.totalmem() / 1024 / 1024)
console.log("uptime", os.uptime() /60 /60)