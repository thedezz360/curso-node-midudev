/* eslint-disable space-before-function-paren */

import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {

  // especificamos que el movieModel le llega por parametro
  // y lo guardamos en una nueva variable llamada movieModel
  constructor({movieModel}){
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    // intentamos recuperar el parametro genre
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    // que es lo que renderiza
    res.json(movies)
  }

  getById = async(req, res) => {
    const { id } = req.params

    const movie = await this.movieModel.getById({ id })

    // si encontramos la movie la devolvemos
    if (movie) return res.json(movie)
    // movie no encontrada
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async(req, res) => {
    // validamos el body
    const result = validateMovie(req.body)

    // comprobamos si tenemos algun error
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await this.movieModel.create({ input: result.data })

    // respondemos
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

   update = async (req, res) => {
    // validamos el body
    const result = validatePartialMovie(req.body)

    // comprobamos la validacion
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await this.movieModel.update({ id, input: result.data })

    // si encontramos la movie y se ha actualizado la devolvemos
    if (updatedMovie) return res.json(updatedMovie)
    // movie no encontrada
    res.status(404).json({ message: 'Movie not found' })
    
  }
}
