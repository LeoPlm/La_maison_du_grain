import express from "express"
import {env} from "./config/index.js"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors" 

// ROUTES
import userRoutes from "./routes/user.router.js"
import avisRoutes from "./routes/avis.router.js"
import articleRoutes from "./routes/article.router.js"
import commandeRoutes from "./routes/commande.router.js"
import detailsRoutes from "./routes/details.router.js"

// Module pour gérer le chemin de fichiers
import path from "path"
// Module pour convertir les url en chemins de fichiers
import { fileURLToPath } from "url"
// Obtient le chemin du fichier actuel
const __filename = fileURLToPath(import.meta.url)
// Obtient le répertoire du fichier actuel
const __dirname = path.dirname(__filename)

// APP express
const app = express()

// PORT
const PORT = env.PORT || 8080

// DATABASE MONGOOSE
mongoose
.connect(env.MONGO_URI, {dbName: env.DB_NAME})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(error => console.log(error))

// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true // Permet les cookies
}));
// Middleware qui permet de servir les fichiers statiques du dossier uploads. Il rend les fichiers uploadés, comme les images, accessible via l'url '/uploads' .
// Par exemple une image : photo.jpp sera accessible via http://localhost:8000/uploads/photo.jpp
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// Ce middleware permet de traiter les données envoyées depuis un formulaire html. Extended: true permet de gérer les objets imbriqué dans les données du formulaire.
app.use(express.urlencoded({extended: true}))

// PREFIX ROUTES
app.use("/api/user", userRoutes)
app.use("/api/avis", avisRoutes)
app.use("/api/article", articleRoutes)
app.use("/api/commande", commandeRoutes)
app.use("/api/details", detailsRoutes)

// SERVER
app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})