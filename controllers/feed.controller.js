import { actualizarFeedsEnStorage } from '../helpers/index.js'
import Feed from '../models/feed.model.js'

const findAll = (req, res, next) => {
  Feed.find().then((feeds) => {
    res.json({
      ok: true,
      feeds,
    })
  })
}

const findById = (req, res, next) => {
  const { feedId } = req.params
  Feed.find().then((feeds) => {
    const feed = feeds.find((f) => f.id === feedId)
    if (!feed) {
      return res.json({
        ok: true,
        message: 'No se encontro un feed con este id.',
      })
    }
    res.json({
      ok: true,
      feed,
    })
  })
}

const save = (req, res, next) => {
  const feed = new Feed(req.body)
  feed.save().then((usuarioRegistrado) => {
    res.json({
      ok: true,
      usuario: usuarioRegistrado,
    })
  })
}

const update = (req, res, next) => {
  Feed.find().then((feeds) => {
    const feedIndice = feeds.findIndex((f) => f.id === req.params.feedId)
    feeds[feedIndice] = {
      ...feeds[feedIndice],
      title: req.body.title,
      content: req.body.content,
    }
    actualizarFeedsEnStorage(feeds)
      .then((message) => {
        res.json({ ok: true, message })
      })
      .catch((errorMessage) => {
        res.status(500).json({ ok: false, message: errorMessage })
      })
  })
}

const deleteFeed = (req, res, next) => {
  Feed.find().then((feeds) => {
    feeds = feeds.filter((f) => f.id !== req.params.feedId)
    actualizarFeedsEnStorage(feeds)
      .then(() => {
        res.json({ ok: true, message: 'Feed eliminado con exito' })
      })
      .catch((errorMessage) => {
        res.status(500).json({ ok: false, message: errorMessage })
      })
  })
}

export { findById, findAll, save, update, deleteFeed }
