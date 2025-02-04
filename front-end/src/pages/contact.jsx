import { useState } from "react"

export const Contact = () => {

  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')


  const handleTextChange = e =>{
    const {value} = e.target
    setMessage(value)
  }


  return (
    <div>
      <form style={{display: "flex", flexDirection: "column", width: "30%", gap: "10px"}}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="msg">Message :</label>
        <textarea name="msg" id="msg" placeholder="écrivez quelque chose ici..." onChange={e => setMessage(e.target.value)}></textarea>
        <input type="submit" value="envoyer" />
      </form>
    </div>
  )
}