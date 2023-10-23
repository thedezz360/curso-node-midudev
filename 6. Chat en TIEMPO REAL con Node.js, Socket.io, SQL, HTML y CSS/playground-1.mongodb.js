/* global use, db */
use("chatApp");

// db.createCollection("messages",{
// 	validator:{
// 		$jsonSchema: {
// 			bsonType: "object",
// 			required: ["content"],
// 			properties: {
// 				content: {
// 					bsonType: "string",
// 					description: "no hay contenido"
// 				}
// 			}
// 		}
// 	}
// });

db.getCollection("messages")
	.find({mensaje: "zapata"});
	