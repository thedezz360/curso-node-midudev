import { Router } from 'express'

import { MovieController } from '../controllers/movies-controllers.js'

export const createMovieRouter = ({movieModel})=> {
    const moviesRouter = Router()
    const movieController = new MovieController({movieModel})
    
    // Todos los recursos que sean MOVIES  se identifican con /movies
    // recuperar todas las peliculas
    moviesRouter.get('/', movieController.getAll)
    
    // obtener una movie mediante su id
    moviesRouter.get('/:id', movieController.getById)
    
    // creamos una nueva movie
    moviesRouter.post('/', movieController.create)
    
    // eliminar movie
    moviesRouter.delete('/:id', movieController.delete)
    
    // actializamos una parte de la movie
    moviesRouter.patch('/:id', movieController.update)

    return moviesRouter
}
