import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFile,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const dbDir = join(__dirname, '../', 'database')
export const dbFile = join(dbDir, 'db.json')

let db, feeds
if (existsSync(dbFile)) {
  console.log('Base de datos online')
  db = JSON.parse(readFileSync(dbFile))
  feeds = db.feeds
} else {
  console.log('Se ha creado la base de datos')
}

export const crearBaseDeDatos = (dbDir) => {
  mkdirSync(dbDir)
  writeFileSync(
    join(dbDir, 'db.json'),
    JSON.stringify({ feeds: [], usuarios: [], config: {} }, null, 2)
  )
  return new Promise((resolve) => resolve('DB/CREATE_FILE'))
}

export const actualizarFeedsEnStorage = (feeds) => {
  return new Promise((resolve, reject) => {
    writeFile(
      dbFile,
      JSON.stringify({ ...db, feeds: [...feeds] }, null, 2),
      (err) => {
        if (err) reject(err.message)
        resolve('Feed actualizado con exito')
      }
    )
  })
}

export { db, feeds }
