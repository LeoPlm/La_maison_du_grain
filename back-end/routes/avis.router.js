import express from "express"
import {verifieToken, verifyAdmin} from "../middlewares/auth.js"
import {getAvis, addAvis, getAvisById, updateAvis, deleteAvis} from "../controllers/avis.controller.js"

const router = express.Router()

router.get('/get', verifieToken, verifyAdmin, getAvis)

router.get('/get/:idAvis', verifieToken, getAvisById)

router.post('/add', verifieToken, addAvis)

router.put('/update/:idAvis', verifieToken, updateAvis)

router.delete('/delete/:idAvis', verifieToken, deleteAvis)

export default router