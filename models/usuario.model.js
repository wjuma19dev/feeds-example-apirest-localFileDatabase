import { v4 as uuidv4 } from 'uuid'
import { readFile, writeFile } from 'node:fs'

import { dbFile } from '../helpers/index.js'

class Usuario {
  constructor({ username, email, password }) {
    this.username = username
    this.email = email
    this.password = password
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

  static find(field) {
    let resultado

    if (!field) {
      return new Promise((resolve, reject) => {
        readFile(dbFile, 'utf-8', (err, fileContent) => {
          if (err) return reject(err.message)
          resolve(JSON.parse(fileContent).usuarios)
        })
      })
    }
    switch (Object.keys(field)[0]) {
      case 'email':
        resultado = new Promise((resolve, reject) => {
          readFile(dbFile, 'utf-8', (err, fileContent) => {
            if (err) return reject(err.message)
            const usuario = JSON.parse(fileContent).usuarios.find(
              (u) => u.email === field.email
            )
            resolve(usuario ? usuario : null)
          })
        })
        break
      case 'id':
        resultado = new Promise((resolve, reject) => {
          readFile(dbFile, 'utf-8', (err, fileContent) => {
            if (err) return reject(err.message)
            const usuario = JSON.parse(fileContent).usuarios.find(
              (u) => u.id === field.id
            )
            resolve(usuario ? usuario : null)
          })
        })
        break
      default:
        resultado = new Promise((resolve, reject) => {
          readFile(dbFile, 'utf-8', (err, fileContent) => {
            if (err) return reject(err.message)
            resolve(JSON.parse(fileContent).usuarios)
          })
        })
        break
    }
    return resultado
  }

  static actualizarUsuario(id, data) {
    return new Promise((resolve, reject) => {
      readFile(dbFile, 'utf-8', (err, fileContent) => {
        if (err) return reject(err.message)
        const storage = JSON.parse(fileContent)
        const index = storage.usuarios.findIndex((u) => u.id === id)
        if (index === -1) return reject('Usuario no encontrado')
        storage.usuarios[index] = { id, ...data }
        writeFile(dbFile, JSON.stringify(storage, null, 2), (err) => {
          if (err) return reject(err.message)
          resolve('Usuario actualizado con exito')
        })
      })
    })
  }
}

export default Usuario
