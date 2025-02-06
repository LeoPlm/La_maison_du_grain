import { useState } from "react"
import axios from 'axios'

export const Contact = () => {

  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [isemailSent, setIsEmailSent] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setIsEmailSent("loading")
    try{
      await axios.post(`http://localhost:8000/api/contact/send`, {email, message})
      setIsEmailSent("success")
      setEmail("");
      setMessage("")
    }catch(err){
      setIsEmailSent("error")
    }
    const timeout = setTimeout(() => setIsEmailSent("idle"), 3000)

    return () => clearTimeout(timeout)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "30%", gap: "10px"}}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} value={email}/>
        <label htmlFor="msg">Message :</label>
        <textarea name="msg" id="msg" required placeholder="écrivez quelque chose ici..." onChange={e => setMessage(e.target.value)} value={message}></textarea>
        <input type="submit" value="envoyer" />
      </form>
      {isemailSent === "success" && <p style={{color: 'green'}}>Votre mail a bien été envoyé</p>}
      {isemailSent === "error" && <p style={{color: 'red'}}>Erreur lors de l'envoi</p>}
    </div>
  )
}