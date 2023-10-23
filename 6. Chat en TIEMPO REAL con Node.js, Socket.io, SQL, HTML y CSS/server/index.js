import express from "express";
import logger from "morgan";

import { Server } from "socket.io";
import { createServer } from "node:http";

import {dbModel} from "./database/mongodb/mongodb.js";

import "dotenv/config.js";


const port = process.env.PORT ?? 3001;

// inicializamos express
const app = express();

// creamos un servidor http, apartir de la app de express
const server = createServer(app);

// implementamos socket.io, asi tenemos un servidor de web sockets
const io = new Server(server,{
	// con esto evitamos que los mensajes que no se reciban por falta de conexion se puedan recuperar
	connectionStateRecovery:{
		maxDisconnectionDuration:1000
	}
});

// cuando tengamos conexion ejecutamos el callback
// un socket significa una conexion en concreto
io.on("connection", (socket)=> {
	console.log("a user has coneccted");

	// aviso cuando el cliente se desconecta
	socket.on("disconnect", () => {
		console.log("an user has disconnected");
	});

	//cuando recibimos un chat message, ejecutamos la callback
	socket.on("chat message",async (msg) => {
		//guardamos en la base de datos el mensaje
		let result;
		try{
			result = await dbModel.createMessage({input: msg});
		}catch(e){
			console.error("No se pudo guardar el mensaje", e);
			return;
		}
		// hacemos de bradcast, emitimos el mensaje a todos los users
		io.emit("chat message", msg, result.insertedId.toString());
	});
});

// inivializamos logger
app.use(logger("dev"));

// especificamos que vamos a responder con un archivo
// en este caso respondemos con el html del client
// cwd -> current workink directory, 
// nos devulelve desde donde se ha ejecutado el proceso
app.get("/", (req,res) => {
	res.sendFile(process.cwd() + "/client/index.html");
	
});

// ahora escuchamos el servidor en lugar de la app
server.listen(port, ()=>{
	console.log(`server running on port ${port}`);
});


// pruebo la conexion a la base de datos
dbModel.testConnection();








