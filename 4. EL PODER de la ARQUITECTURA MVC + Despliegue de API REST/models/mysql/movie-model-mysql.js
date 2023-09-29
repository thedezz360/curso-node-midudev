import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)



export class MovieModel {
  static async getAll({ genre }) {

    if(genre){
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database table using genre name
      const [genres] = await connection.query(
        'select id, name from genres where lower(name) = ?;' ,[lowerCaseGenre] 
      )

      // no genre found
      if(genres.length === 0 )return []

      // get the id from the first genre result
      const [{id}] = genres

      // get all movies from database table
      const [moviesGenre] = await connection.query(
        "select INSERT(INSERT(INSERT(INSERT(hex(movie_id), 20, 0, '-'), 16, 0, '-'), 12, 0, '-'), 8, 0, '-') as movie_id, " +
        "title, year, director, duration, poster,rate " +
        "from movies_genres " +
        "inner join movies on movies_genres.movie_id = movies.id " +
        "where genre_id = ?;" ,[id] 
      )
      return moviesGenre
      
    }

    const [movies] = await connection.query(
        "SELECT INSERT(INSERT(INSERT(INSERT(hex(id), 20, 0, '-'), 16, 0, '-'), 12, 0, '-'), 8, 0, '-') as uuid, title, year, director, duration, poster, rate  from movies;"
    )

    return movies
  }


  static async getById({ id }) {
    
    const [movie] = await connection.query(
      "select INSERT(INSERT(INSERT(INSERT(hex(id), 20, 0, '-'), 16, 0, '-'), 12, 0, '-'), 8, 0, '-') as id," +
      "title, year, director, duration, poster, rate " +
      "from movies "+
      "where INSERT(INSERT(INSERT(INSERT(hex(id), 20, 0, '-'), 16, 0, '-'), 12, 0, '-'), 8, 0, '-') = ?;", [id]
    )
    if (movie.length === 0) return null
    
    return movie[0];
  }


  static async create({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      director,
      duration,
      poster,
      rate,
    } = input

    // todo: crear la conexion de genre

    // generamos el uuid desde la base de datos
    const [uuidResult] = await connection.query("select uuid() uuid")
    
    // recuperamos el uuid
    const [{uuid}] = uuidResult

    try{
      // creamos la nueva movie
      await connection.query(
        `insert into movies (id, title, year, director, duration, poster, rate)
        values (UNHEX(REPLACE( ?,'-','')), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )

      // recuperamos la nueva movie que hemos creado
      const [movie] = await connection.query(
        `select INSERT(INSERT(INSERT(INSERT(hex(id), 20, 0, '-'), 16, 0, '-'), 12, 0, '-'), 8, 0, '-') as id,
        title, year, director, duration, poster, rate  
        from movies where id = unhex(replace(?,'-',''));`,
        [uuid]
      )
      return movie[0]

    }catch(e){

      // puede enviarle informacion sensible
      throw new Error('Error creating movie')
      // enviar la traza a un servicio interno
    }
  }


  static async delete({ id }) {
    try{
      const [result] = await connection.query(
        `delete FROM moviesdb.movies where id = unhex(replace( ?,'-',''));`,
        [id]
      )
      
      if(result.affectedRows === 0)return false;
      return true;

    }catch(e){
      console.log(e)
      throw new Error('Error delete movie')
    }
  }


  static async update({ id, input }) {
   try{
    // buscamos la peli mediante el id
    const [movie] = await connection.query(
      `select INSERT(INSERT(INSERT(INSERT(hex(id), 20, 0, '-'), 16, 0, '-'), 12, 0, '-'), 8, 0, '-') as id,
        title, year, director, duration, poster, rate  
        from movies where id = unhex(replace(?,'-',''));`,
      [id]
    )
     
    //si no encontramos la movie, return null
    if(movie.length === 0 )return null

    //creamos la newMovie con los datos nuevos
    const newMovie = {
      ...movie[0],
      ...input
    }

    // devolvemos la movie actualizada
    return newMovie

   }catch(e){
    console.log(e)
    throw new Error('Error update movie')
   }

  }

}
