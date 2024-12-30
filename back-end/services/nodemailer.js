import nodemailer from "nodemailer"
import {env} from "../config/index.js"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
})

export const sendEmail = async (user, verifieToken) =>{
    const verificationLink = `<a href='http://localhost:3000/verify/${verifieToken}'>${verifieToken} </a> `

    await transporter.sendMail({
        from: env.EMAIL_USER,
        to: user.email,
        subject: "vérifier votre email",
        text: `Hello ${user.prenom},\n\nMerci de votre inscription.\n\nCliquez sur ce lien pour vérifier votre email: ${verificationLink}\n\nCordialement,\nLa Maison du Grain`,
    html: `
        <p>Hello ${user.prenom},</p>
        <p>Merci de votre inscription.</p>
        <p>Cliquez sur ce lien pour vérifier votre email: ${verificationLink} </p>
        <p>Cordialement,<br>La Maison du Grain</p>
    `
    })

}