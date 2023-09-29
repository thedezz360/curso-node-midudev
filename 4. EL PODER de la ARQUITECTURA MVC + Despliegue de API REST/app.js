import express, { json } from "express";
import { createMovieRouter } from "./routes/movies-routes.js";
import { corsMiddleware } from "./middlewares/cors.js";


export const createdApp = ({ movieModel }) => {
  const PORT = process.env.PORT || 3000;
  const app = express();

  // middleware que solo parcea json y solo procesa las request que tengan un header especifico
  app.use(json());
  // es un header que nos inyecta express por defecto, lo desabilitamos
  app.disable("x-powered-by");

  // middleware para los cors
  app.use(corsMiddleware());

  // cuando vamos a /movies usamos el moviesRouter
  app.use("/movies", createMovieRouter({ movieModel }));

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
