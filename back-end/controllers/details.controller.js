import Details from "../models/details.model.js"
import Article from "../models/article.model.js"

export const getDetails = async(req,res,next) =>{
    try{
        const details = await Details.find().populate('article')
        res.status(200).json(details)
    }catch(e){
        next(e)
    }
}

export const getDetailsById = async (req,res,next) =>{
    try{
        const details = await Details.findById(req.params.detailsId).populate('article')
        if(!details) return res.status(404).json("details not found")
        return res.status(200).json(details)
    }catch(e){
        next(e)
    }
}

export const addDetails = async (req,res,next) =>{
    try{
        const newDetails = await Details.create(req.body)
        const populatedNewDetails = await Details.findById(newDetails._id).populate('article')

        const subtotal = populatedNewDetails.article.price * req.body.quantity 

        populatedNewDetails.subtotal = subtotal
        await populatedNewDetails.save()

        res.status(201).json(populatedNewDetails)
    } catch(e){
        next(e)
    }
}

export const updateDetails = async (req,res,next) =>{
    try{
        const updatedDetails = await Details.findByIdAndUpdate(req.params.detailsId, {$set: req.body}, {new:true})
        if(!updatedDetails) return res.status(404).json(" articles details not found")
        const populatedDetails = await Details.findById(updatedDetails._id).populate('article')
        return res.status(200).json({message: "articles details updated", details: populatedDetails})
    }catch(e){
        next(e)
    }
}

export const deleteDetails = async (req,res,next) =>{
    try{
        const dDetails = await Details.findByIdAndDelete(req.params.detailsId)
        if(!dDetails) return res.status(404).json("Articles details not found")
        res.status(200).json(`article details ${req.params.detailsId} have been deleted`)
    }catch(e){
        next(e)
    }
}