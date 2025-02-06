import { json } from "express"
import { sendContactForm } from "../services/nodemailer.js"
import { env } from "../config/index.js"

export const handleContactForm = async(req, res) =>{
  try{
    const {email, message} = req.body
    
    if(!email || !message){
      return json.status(400).json({message: "email and message required"})
    }
      await sendContactForm(
        env.EMAIL_USER,
        "Nouveau Message depuis La Maison du Grain",
        `Message depuis ${email} : \n \n ${message}`,
        `<p>Vous avez un nouveau message de <strong>${email}</strong> :</p> <p>${message}</p>`,
        email,
      )
      return res.status(200).json({message: "message envoyé avec succès"})
    
  }catch (error){
    return res.status(500).json({message: "erreur lors de l'envoi du message"})
  }
}