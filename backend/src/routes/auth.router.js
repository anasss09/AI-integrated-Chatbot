import express from 'express'
import { getCheckAuth, postLogin, postLogout, postSignUp } from '../controller/auth.controller.js';
import { verifyjwt } from '../middleware/verifyJWT.js'

const router = express.Router();

router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.post("/logout", postLogout);

router.get("/check", verifyjwt , getCheckAuth);

export default router;