import { createdApp } from "./app.js";
import { MovieModel } from "./models/local-file-system/movie-model-local.js";

createdApp({movieModel: MovieModel})
