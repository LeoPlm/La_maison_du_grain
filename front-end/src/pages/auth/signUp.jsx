import { useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container } from "react-bootstrap";

export const SignUp = () => {

    const [user, setUser] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: '',
        adresse: {
            rue: '',
            ville: {
                nom: '',
                code_postal: '',
                pays: {
                    name: ''
                }
            }
        }
    })

    const handleChange = e =>{
        const {value, name} = e.target
        if(name === 'rue'){
            setUser(prev => ({...prev, adresse: {...prev.adresse, [name] : value}}))
        } else if(name === 'city' || name === 'cp') {
            setUser(prev =>({...prev, adresse: {...prev.adresse, ville: {...prev.adresse.ville, [name === 'city' ? 'nom' : 'code_postal'] : value}}
        }))} else if(name === 'country'){
            setUser(prev => ({...prev, adresse: {...prev.adresse, ville: {...prev.adresse.ville, pays : {...prev.adresse.ville.pays, name: value} }}}))
        }else{
            setUser(prev => ({...prev, [name]: value}))
        }
        console.log(user)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await axios.post(`http://localhost:8000/api/user/signup`, user)
            if (response.status === 201) {
                console.log("L'utilisateur a bien été enregistré", response.data);
            } else {
                console.error("L'enregistrement utilisateur a échoué", response.data);
            }
        }catch (err) {
            console.error({err: err.message})
        }
    }

    return (
<Container className=" mt-3 bg-grey col-6">
    <h2 className="cinzel text-center mt-3">Inscription</h2>
    <form className="col-4 d-flex flex-column"  onSubmit={handleSubmit}>
        <label htmlFor="prenom">Votre Prénom</label>
        <input type="text" name="prenom" id="prenom" required value={user.prenom} onChange={handleChange}/>

        <label htmlFor="avatar">Votre Nom</label>
        <input type="text" name="nom" id="nom" required value={user.nom} onChange={handleChange}/>

        <label htmlFor="email">Votre adresse mail:</label>
        <input type="email" name="email" id="email" required value={user.email} onChange={handleChange}/>

        <label htmlFor="password">Votre mot de passe</label>
        <input type="password" name='password' id="password" value={user.password} onChange={handleChange}/>
        
        <fieldset style={{display: "flex",justifyContent: "start", alignItems: "start", flexDirection:"column"}}>
            <legend>Adresse</legend>
            <label htmlFor="rue">Nom et numéro de voie</label>
            <input type="text" name='rue' id="rue" value={user?.adresse?.rue} onChange={handleChange}/>
            
            <label htmlFor="city">Ville</label>
            <input type="text" name='city' id="city" value={user?.adresse?.ville?.nom} onChange={handleChange}/>
            
            <label htmlFor="cp">Code postal</label>
            <input type="text" name='cp' id="cp" value={user?.adresse?.ville?.code_postal} onChange={handleChange}/>
            
            <label htmlFor="country">Pays</label>
            <input type="text" name='country' id="country" value={user?.adresse?.ville?.pays?.name} onChange={handleChange}/>
        </fieldset>
        
        <input type="submit" value="Je m'enregistre !" />

        <Link to='/sign'>Already registered ?</Link>
    </form>
    </Container>
    )
}