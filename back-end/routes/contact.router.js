import express from 'express'
import { handleContactForm } from '../controllers/contact.controller.js'

const router = express.Router()

router.post("/send", handleContactForm)

export default router