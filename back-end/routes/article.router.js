import express from "express"
import { verifieToken, verifyAdmin } from "../middlewares/auth.js"
import { addArticle, getArticle, getArticleById, updateArticle, deleteArticle, getArticleByAscendingPrice, getArticleByDescendingPrice } from "../controllers/article.controller.js"
import upload from "../services/multer.cjs"

const router = express.Router()

// Routes statiques
router.get('/get/ascending-price', getArticleByAscendingPrice)
router.get('/get/descending-price', getArticleByDescendingPrice)
router.get('/get', getArticle)

// Routes dynamiques
router.get('/get/:articleId', getArticleById)

router.post('/add',  upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
    { name: 'img4', maxCount: 1 },
]), addArticle)

router.put('/update/:articleId', verifieToken, verifyAdmin, updateArticle)

router.delete('/delete/:articleId', verifieToken, verifyAdmin, deleteArticle)

export default router