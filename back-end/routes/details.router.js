import express from "express"
import { getDetails, getDetailsById, addDetails,updateDetails,deleteDetails } from "../controllers/details.controller.js"
import {verifieToken, verifyAdmin} from "../middlewares/auth.js"

const router = express.Router()

router.get('/get', verifieToken, verifyAdmin, getDetails)

router.get('/get/:detailsId', verifieToken, getDetailsById)

router.post('/add', verifieToken, addDetails)

router.put('/update/detailsId', verifieToken, updateDetails)

router.delete('/delete/:detailsId', verifieToken, deleteDetails)

export default router