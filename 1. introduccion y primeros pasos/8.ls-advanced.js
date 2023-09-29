const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  // obtenemos los archivos
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(pc.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }

  // obtenemos la informacion de los archivos

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(
      fileSize.toString().padStart(10)
    )} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)
  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
