import { useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

export const SignUp = () => {

    const [user, setUser] = useState({
        prenom: '',
        avatar: '',
        email: '',
        password: ''
    })

    const handleChange = e =>{
        const {value, name} = e.target
        setUser(prev =>({...prev, [name]:value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await axios.post(`http://localhost:8000/api/user/signup`, user)
            if (response.status === 200) {
                console.log("L'utilisateur a bien été enregistré", response.data);
            } else {
                console.error("L'enregistrement utilisateur a échoué", response.data);
            }
        }catch (err) {
            console.error({err: err.message})
        }
    }

    return (
        <>
    <h1>Inscription</h1>
    <form style={{display: 'flex', flexDirection: 'column', width: "30%"}} onSubmit={handleSubmit}>
        <label htmlFor="prenom">Votre Prénom</label>
        <input type="text" name="prenom" id="prenom" required value={user.prenom} onChange={handleChange}/>

        <label htmlFor="avatar">Votre Avatar</label>
        <input type="text" name="avatar" id="avatar" required value={user.avatar} onChange={handleChange}/>

        <label htmlFor="email">Votre adresse mail:</label>
        <input type="email" name="email" id="email" required value={user.email} onChange={handleChange}/>

        <label htmlFor="password">Votre mot de passe</label>
        <input type="password" name='password' id="password" value={user.password} onChange={handleChange}/>

        <input type="submit" value="Je m'enregistre !" />

        <Link to='/sign'>Already registered ?</Link>
    </form>
    </>
    )
}