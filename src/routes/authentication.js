import * as authCtrls from '../controllers/authen.controller'
import {Router} from 'express'
const router = Router()

router.post('/signup', authCtrls.signup)
router.post('/signin', authCtrls.signin)

export default router