import jwt from "jsonwebtoken"
import { env } from "../config/index.js"
import { createError } from "./error.js"

export const verifieToken = (req, res, next) => {

    const token = req.cookies.access_token
    if(!token) return next(createError(401, "Acces denied"))
    
    jwt.verify(token, env.SECRET_TOKEN, (err, decoded) =>{
        if(err) return next(createError(403, "Token non valide"))
        req.user = decoded
        
        // Il faut vérifier que req.params.id existe avant de faire la comparaison avec req.user.id, sinon js pense que req.params.id === undefined
        if(req.params.id && req.user.id !== req.params.id && req.user.role !== "admin") return res.status(403).json("Unauthorized")
        return next()
    })
    
}

export const verifyAdmin = (req, res, next) =>{
    if(req.user.role !=="admin") return next(createError(403, "Access denied"))
    next()
}
