import express from "express";
import logger from "morgan";

const port = process.env.PORT ?? 3000;

// inicializamos express
const app = express();

// inivializamos logger
app.use(logger("dev"));

// especificamos que vamos a responder con un archivo
// cwd -> current workink directory
app.get("/", (req,res) => {
	res.sendFile(process.cwd() + "/client/index.html");
});

app.listen(port, ()=>{
	console.log(`server running on port ${port}`);
});



