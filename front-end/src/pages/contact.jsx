import { useState } from "react"
import axios from 'axios'
import { Container } from "react-bootstrap"
import '../styles/contact.css'

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
    <Container>
      <h2 className="d-flex justify-content-center mt-3 cinzel">Une question ou un conseil ?</h2>
      <h2 className="d-flex justify-content-center cinzel">Contactez-nous!</h2>
      
      <form onSubmit={handleSubmit} className="d-flex flex-column bg-grey-contact mt-3 col-xl-8 mx-auto p-4">
        <label htmlFor="email" className="form-label">E-mail</label>
        <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} value={email} className="form-control"/>
        
        <label htmlFor="msg" className="form-label">Message :</label>
        <textarea name="msg" id="msg" required placeholder="écrivez quelque chose ici..." onChange={e => setMessage(e.target.value)} value={message} className="form-control"></textarea>
        <input type="submit" value="envoyer" className="btn btn-success resorb-bg bg-dark mt-3 border-0"/>
      </form>
      {isemailSent === "success" && <p style={{color: 'green'}}>Votre mail a bien été envoyé</p>}
      {isemailSent === "error" && <p style={{color: 'red'}}>Erreur lors de l'envoi</p>}
    </Container>
  )
}