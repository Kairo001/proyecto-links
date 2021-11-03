import * as linksCtrl from '../controllers/links.controller'
import passport from 'passport'
import {Router} from 'express'
const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), linksCtrl.getLinks)

router.post('/', passport.authenticate('jwt', { session: false }), linksCtrl.createLink)

router.get('/:id', passport.authenticate('jwt', { session: false }), linksCtrl.getLink)

router.delete('/:id', passport.authenticate('jwt', { session: false }), linksCtrl.deleteLink)

router.put('/:id', passport.authenticate('jwt', { session: false }), linksCtrl.updateLink)



export default router