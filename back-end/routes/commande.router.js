import express from "express"
import { getCommande, getCommandeById, createCommande, deleteCommande, updateCommande, getCommandeEnCours } from "../controllers/commande.controller.js"
import { verifieToken, verifyAdmin } from "../middlewares/auth.js"

const router = express.Router()

router.get('/get', verifieToken, verifyAdmin, getCommande)

// Nouvelles commandes
router.get('get/en-cours', verifieToken, verifyAdmin, getCommandeEnCours )

router.get('/get/:commandeId', verifieToken, getCommandeById)

router.post('/add', verifieToken, createCommande)

router.put('/update/:commandeId', verifieToken, updateCommande)

router.delete('/delete/:commandeId', verifieToken, deleteCommande)

export default router 