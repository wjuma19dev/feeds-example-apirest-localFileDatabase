import { Router } from 'express'
import {
  findAll,
  findById,
  save,
  update,
  deleteFeed,
} from '../controllers/feed.controller.js'
import { isAuth } from '../middlewares/is-auth.js'
const router = Router()

router.get('/', findAll)
router.get('/:feedId', findById)
router.post('/', [isAuth], save)
router.put('/:feedId', update)
router.delete('/:feedId', deleteFeed)

export default router
