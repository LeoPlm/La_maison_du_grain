import User from "../models/user.model.js"
import Ville from "../models/ville.model.js"
import Pays from "../models/pays.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {env} from "../config/index.js"
import {sendEmail} from "../services/nodemailer.js"


export const signup = async (req, res,next) =>{
    try{
        const existingUser = await User.findOne({email: req.body.email})
        if(existingUser) return res.status(400).json(`email adress ${req.body.email} already in use`)

        
        let villeObj, paysObj

        if(req.body.adresse){
            const {ville} = req.body.adresse
            const {pays} = ville
            if(pays){
                paysObj = await Pays.findOne({nom: pays.nom}) || await Pays.create(pays)
            }

            if(ville){
                villeObj = await Ville.findOne({nom: ville.nom, code_postal: ville.code_postal})
                if(!villeObj) villeObj = await Ville.create({
                    nom: ville.nom,
                    code_postal: ville.code_postal,
                    pays: paysObj ? paysObj._id : undefined
                })
                await villeObj.populate('pays')
            }
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const user = await User.create({
            ...req.body, 
            password: hashedPassword, 
            adresse: req.body.adresse ? 
            [{
                rue: req.body.adresse.rue || undefined , 
                ville: villeObj._id || undefined, 
            }] : undefined
        })

        
        const verificationToken = jwt.sign(
                {id: user._id},
                env.SECRET_TOKEN,
                {expiresIn: '10min'}
        )

        await sendEmail(req.body, verificationToken)

        if(user.adresse && (user.adresse[0].ville)) {
            await user.populate('adresse.ville')
        }
        
        return res.status(201).json({message:"user has been created and email has been sent", user})
    } catch (err){
        next(err)
    }
}

export const verifyEmail = async (req,res,next) =>{
    try{
        const {token} = req.params
        const decoded = jwt.verify(token, env.SECRET_TOKEN)
        await User.findByIdAndUpdate(decoded.id, {isVerified: true}, {new:true})
        res.status(200).json({message: 'Email vérifié avec succès!'})
    }catch(err){
        console.error('Erreur de vérification:', err)
        res.status(400).json({message: 'Lien invalide ou expiré'})
    }
}

export const sign = async (req,res,next) =>{
    try{
    const isUser = await User.findOne({email: req.body.email})
    if(!isUser) return res.status(401).json("Unauthorized")

    const comparePassword = await bcrypt.compare(req.body.password,isUser.password)
    if (!comparePassword) return res.status(400).json("Wrong Credentials")

    if(!isUser.isVerified){
        return res.status(403).json({message: 'veuillez vérifier vtre email pour accéder à cette fonctionnalité'})
    }

    // Création du token de connexion
    const token = jwt.sign(
    {id: isUser._id, role: isUser.role},
    env.SECRET_TOKEN,
    {expiresIn: "24h"})

    const {password, ...others} = isUser._doc

    return res.cookie("access_token", token, {httpOnly: true}).status(200).json(others) //httpOnly: true protège des attaques XSS
    }catch(err){
        next(err)
    }
}

export const getUsers = async (req,res,next) =>{
    try{
        const user = await User.find().populate("adresse.ville")
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}

export const getUserAsUser = async (req, res, next) =>{
    try{
    const userId = req.user.id
    const user = await User.findById(userId).select("-password").populate("adresse.ville")
    if(!user) return res.status(404).json("user not found")
    res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const getUserAsAdmin = async (req,res,next) =>{
    try{
        const userById = await User.findById(req.params.id).populate("adresse.ville")
        if(!userById) return res.status(404).json("user not found")
        res.status(200).json(userById)
    }catch(err){
        next(err)
    }
}

export const deleteUser = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json("User not found")
        
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({success_message: `The user with the id ${req.params.id} has been deleted`})
    }catch(e){
        next(e)
    }
}

export const updateUser = async (req,res,next)=>{
    try{
        const { adresse, ...otherUpdates } = req.body.payload || req.body
        let villeId = null
        let updatedAdress = []
        
        if(adresse?.length > 0){
            const {rue, ville} = adresse[0]
            if(ville){
                const {nom: nomVille, code_postal, pays} = ville
                let existingVille = await Ville.findOne({code_postal})
                if(!existingVille){
                    const newVille = await Ville.create({code_postal, nom: nomVille, pays})
                    villeId = newVille._id
                } else {
                    villeId = existingVille._id
                }
                updatedAdress.push({rue: rue ? rue : undefined , ville: villeId})
            } 
        }
        const updateData = {...otherUpdates}
        if(req.body.hasOwnProperty("adresse")){
            updateData.adresse = updatedAdress.length > 0 ? updatedAdress : []
        }

        console.log("Données envoyées pour mise à jour:", JSON.stringify(updateData, null, 2));

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {$set:updateData}, {new: true})
        console.log({id : req.user.id}) 
        const {password, ...dataWithoutPassword} = updatedUser._doc
        return res.status(200).json({message: 'utilisateur modifié avec succès:', user: dataWithoutPassword})
        
    }catch(e){
        next(e)
    }
}

export const updateUserAsAdmin = async (req,res, next) =>{
    try{
        const {adresse, ...otherUpdates} = req.body
        let villeId = null
        let updatedAdress = []
        
        if(adresse?.length > 0){
            const {rue, ville} = adresse[0]
            if(ville){
                const {nom: nomVille, code_postal, pays} = ville
                let existingVille = await Ville.findOne({code_postal})
                if(!existingVille){
                    const newVille = await Ville.create({code_postal, nom: nomVille, pays})
                    villeId = newVille._id
                } else {
                    villeId = existingVille._id
                }
                updatedAdress.push({rue: rue ? rue : undefined , ville: villeId})
            } 
        }
        const updateData = {...otherUpdates}
        if(req.body.hasOwnProperty("adresse")){
            updateData.adresse = updatedAdress.length > 0 ? updatedAdress : []
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:updateData}, {new: true})

        const {password, ...dataWithoutPassword} = updatedUser._doc
        return res.status(200).json({message: 'utilisateur modifié avec succès:', user: dataWithoutPassword})
    }catch(e){
        next(e)
    }
}