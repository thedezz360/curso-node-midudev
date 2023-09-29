import { createdApp } from "./app.js";
import { MovieModel } from "./models/mysql/movie-model-mysql.js";

createdApp({movieModel: MovieModel})
