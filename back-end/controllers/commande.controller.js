import Commande from "../models/commande.model.js"
import Details from "../models/details.model.js"
import User from "../models/details.model.js"

export const getCommande = async (req,res,next) =>{
    try{
        const commandes = await Commande.find().populate(['user', 'details'])
        res.status(200).json(commandes)
    }catch(e){
        next(e)
    }
}

export const getCommandeById = async(req,res,next) =>{
    try{
        const commande = await Commande.findById(req.params.commandeId).populate(['user','details'])
        if(!commande) return res.status(404).json("commande not found")
        return res.status(200).json(commande)
    }catch(e){
        next(e)
    }
}

export const getCommandeEnCours = async(req,res,next) =>{
    try{
        const commandesEnCours = await Commande.find({status: "en cours de préparation"})
    if(commandesEnCours.length === 0) return res.status(404).json("Aucunes nouvelles commandes")
    res.status(200).json(commandesEnCours)
    }catch (e){
        next(e)
    }
    
}

export const createCommande = async (req,res,next) =>{
    try{
        const newCommande = await Commande.create(req.body)
        const populatedCommande = await Commande.findById(newCommande._id).populate(['user', 'details'])
        
        const total = populatedCommande.details.reduce((total, details) =>{
                return total + details.subtotal
        }, 0)
        res.status(201).json({populatedCommande, total})
    }catch(e){
        next(e)
    }
}

export const updateCommande = async (req,res,next) =>{
    try{
        const updatedCommande = await Commande.findByIdAndUpdate(req.params.commandeId, {$set: req.body}, {new: true})
        if(!updatedCommande) return res.status(404).json(`commande ${req.params.commandeId} not found`)
        return res.status(200).json({message: "commande updated", commande: updatedCommande})
    }catch(e){
        next(e)
    }
}

export const deleteCommande = async (req,res,next) =>{
    try{
        const dCommande = await Commande.findByIdAndDelete(req.params.commandeId)
        if(!dCommande) return res.status(404).json(dCommande)
        return res.status(200).json(`Commande ${req.params.commandeId} supprimée`)
    }catch(e){
        next(e)
    }
}






