/* eslint-disable space-before-function-paren */
import { readJSON } from '../utils/readJSON.js'
import { randomUUID } from 'node:crypto'

const movies = readJSON('../movies.json')

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async create({ input }) {
    // creamos la nueva movie
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    // añadimos la movie
    movies.push(newMovie)

    return newMovie
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    movies.splice(movieIndex, 1)
    return true
  }

  static async update({ id, input }) {
    const movieindex = movies.findIndex((movie) => movie.id === id)

    // obtenemos el index de la movie que se desea actualizar
    if (movieindex === -1) {
      return false
    }

    // actualizamos la movie
    movies[movieindex] = {
      ...movies[movieindex],
      ...input
    }

    // devolvemos la updateMovie
    return movies[movieindex]
  }
}


