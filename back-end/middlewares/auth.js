import jwt from "jsonwebtoken"
import { env } from "../config/index.js"
import { createError } from "./error.js"

export const verifieToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "Acces denied"))
    
    jwt.verify(token, env.SECRET_TOKEN, (err, decoded) =>{
        if(err) return next(createError(403, "Unvalid token"))
        req.user = decoded
        
        // Il faut vérifier que req.params.id existe avant de faire la comparaison avec req.user.id, sinon js pense que req.params.id = undefined
        if(req.params.id && req.user.id !== req.params.id && req.user.role !== "admin") return res.status(403).json("Unauthorized")
        return next()
    })
}

// Fonction utilisée pour avoir l'id du user lorsqu'on est un simple user, afin d'obtenir l'id via les cookies et non le localStorage qui serait une erreur de sécurité
export const verifyTokenWithoutId = (req, res, next) =>{
    const token = req.cookies.access_token

    if(!token) return next(createError(401, "Access denied"))
    
    jwt.verify(token, env.SECRET_TOKEN, (err, decoded) => {
        if (err) return next(createError(403, "Unvalid token"))
        req.user = decoded
        return next()
    })
}

export const verifyAdmin = (req, res, next) =>{
    if(req.user.role !=="admin") return next(createError(403, "Access denied"))
    next()
}
