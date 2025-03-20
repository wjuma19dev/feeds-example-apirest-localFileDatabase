import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { __dirname, dbFile, feeds, db } from '../helpers/index.js'

class Feed {
  constructor({ title, content, userId }) {
    this.title = title
    this.content = content
    this.id = uuidv4()
    this.userId = userId
    this.createdAt = new Date()
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
