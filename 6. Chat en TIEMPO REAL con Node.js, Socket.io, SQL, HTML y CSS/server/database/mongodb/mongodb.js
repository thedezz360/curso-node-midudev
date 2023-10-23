import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config.js";
const uri =  process.env.MONGO_URI;

// create a mongoClient
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});



async function connect() {
	try {
		// connect the client to the server
		await client.connect();

		// seleccionamos la base de datos
		const database = client.db("chatApp");
		// seleccionamos la coleccion
		const collection = database.collection("messages");


		console.log("you successful connected to mongodb");
		return collection;
	

	}catch (e){
		console.log("error to connect: " + e);
	}
	
}

export class dbModel {

	static async testConnection(){
		return connect();
	}

	static async createMessage ({input}){
		console.log(input);
		const db = await connect();

		const resultado = await db.insertOne({
			content: input,
			timeStamp: new Date()
		});
		
		console.log("documento insertado con el id: " + resultado.insertedId );
		return resultado;
	}

	static async recoveryDesconectionMessages({id}){
		const db = await connect();

		const result = await db.findOne({_id: id});

		const results = await db.find({
			timeStamp: { $gte: result.timeStamp }
		}).toArray();

		return results;
	}

	


}




