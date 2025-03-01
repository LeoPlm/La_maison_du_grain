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
        <Container className=" mt-4 bg-grey col-xl-8">
            <h2 className="cinzel text-center mt-3">Inscription</h2>
            <form className="col-xl-6 d-flex flex-column mx-auto p-2"  onSubmit={handleSubmit}>
                <label htmlFor="prenom">Votre Prénom:</label>
                <input className='rounded' type="text" name="prenom" id="prenom" required value={user.prenom} onChange={handleChange}/>

                <label htmlFor="avatar">Votre Nom:</label>
                <input type="text" name="nom" id="nom" required value={user.nom} onChange={handleChange} className='rounded'/>

                <label htmlFor="email">Votre adresse mail:</label>
                <input type="email" name="email" id="email" required value={user.email} onChange={handleChange} className='rounded'/>

                <label htmlFor="password">Votre mot de passe:</label>
                <input type="password" name='password' id="password" value={user.password} onChange={handleChange} className='rounded'/>
                
                <fieldset className="p-4 mt-3 d-flex flex-column">
                    <legend className="mb-0">Adresse:</legend>
                    <p className="text-sm text-body-secondary mb-0">Champs optionnels*</p>
                    <label htmlFor="rue">Nom et numéro de voie:*</label>
                    <input className='rounded' type="text" name='rue' id="rue" value={user?.adresse?.rue} onChange={handleChange}/>
                    
                    <label htmlFor="city">Ville:*</label>
                    <input type="text" name='city' id="city" value={user?.adresse?.ville?.nom} onChange={handleChange} className='rounded'/>
                    
                    <label htmlFor="cp">Code postal:*</label>
                    <input type="text" name='cp' id="cp" value={user?.adresse?.ville?.code_postal} onChange={handleChange} className='rounded'/>
                    
                    <label htmlFor="country">Pays:*</label>
                    <input type="text" name='country' id="country" value={user?.adresse?.ville?.pays?.name} onChange={handleChange} className='rounded'/>
                </fieldset>
                
                <input type="submit" value="Je m'enregistre !" className='mt-4 btn btn-success resorb-bg'/>
            </form>
            <Link to='/sign' className="d-flex justify-content-end text-dark">Déjà inscrit ?</Link>
        </Container>
    )
}