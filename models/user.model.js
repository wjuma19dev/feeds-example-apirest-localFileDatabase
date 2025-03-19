import { v4 as uuidv4 } from 'uuid'
import { readFile, writeFile } from 'node:fs'

import { dbFile } from '../helpers/index.js'

class Usuario {
  constructor({ username, email }) {
    this.username = username
    this.email = email
    this.id = uuidv4()
    this.feeds = []
  }

  save() {
    return new Promise((resolve, reject) => {
      readFile(dbFile, 'utf-8', (err, fileContent) => {
        if (err) return reject(err.message)
        const db = JSON.parse(fileContent)
        const usuarios = db.usuarios
        usuarios.push(this)
        writeFile(
          dbFile,
          JSON.stringify({ ...db, usuarios: [...usuarios] }, null, 2),
          (err) => {
            if (err) return reject(err.message)
            resolve(this)
          }
        )
      })
    })
  }
}

export default Usuario
