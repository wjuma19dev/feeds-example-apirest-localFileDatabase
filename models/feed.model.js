import { existsSync, readFile, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { __dirname, dbFile, feeds, db } from '../helpers/index.js'

class Feed {
  constructor({ title, content }) {
    this.title = title
    this.content = content
    this.id = uuidv4()
    this.userId = 1
  }

  async save() {
    feeds.push(this)
    writeFileSync(dbFile, JSON.stringify({ ...db, feeds: [...feeds] }, null, 2))
    return new Promise((resolve) => resolve(this))
  }

  static find() {
    const storage = readFileSync(dbFile)
    const feeds = JSON.parse(storage).feeds
    return new Promise((resolve) => resolve([...feeds]))
  }
}

export default Feed
