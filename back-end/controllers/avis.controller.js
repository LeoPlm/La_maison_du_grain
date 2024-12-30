import Avis from '../models/avis.models.js'
import Article from "../models/article.model.js"


export const getAvis = async (req,res,next) => {
    try{
        const avis = await Avis.find()
    res.status(200).json(avis)
    }catch(e){
        console.error(e.message) 
    }
    
}

export const getAvisById = async (req,res,next) =>{
    try{
        const avisAndUser = await Avis.findById(req.params.idAvis).populate('User').exec()
        if(!avisAndUser) return res.status(404).json(`Avis with ${req.params.id} not found`)
        return res.status(200).json(avisAndUser)
    }catch(e){
        next(e)
    }
}

export const addAvis = async (req,res,next) =>{
    try{
        const newAvis = await Avis.create(req.body)
        const article = await Article.findById(req.body.article)

        if(!article) return res.status(404).json("Article not found")
        article.avis.push(newAvis._id)
        await article.save()
        
        res.status(201).json(newAvis)
    } catch(e){
        next(e)
    }
}

export const updateAvis = async(req,res,next) =>{
    try{
        const avisUpdated = await Avis.findByIdAndUpdate(req.params.idAvis, {$set: req.body}, {new:true})
        if(!avisUpdated) return res.status(404).json(`avis ${req.params.id} not found`)
        
        return res.status(200).json({message: "avis updated", nouvelAvis: avisUpdated})
    }catch{
        next(e)
    }
}

export const deleteAvis = async(req,res,next) =>{
    try{
        const avis = await Avis.findByIdAndDelete(req.params.idAvis)
        if(!avis) return res.status(404).json("avis not found")
        res.status(200).json(`avis ${req.params.idAvis} has been deleted`)
    }catch(e){
        next(e)
    }
}