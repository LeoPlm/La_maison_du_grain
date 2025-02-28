import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Container } from 'react-bootstrap'
import '../../styles/login.css'

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // v1
    // const autcontext = useContext(AuthContext)
    // const login = authcontext.login

    // v2
    const {login} = useContext(AuthContext)

    const [errMess, setErrMess] = useState('')
    const [connexion, setConnexion] = useState(false)

    const handleChange = e =>{
        const {value, name} = e.target
        setUser(x =>({...x, [name]: value}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        setConnexion(true)
        setErrMess('')
        login(user);
        setConnexion(false)
        setErrMess('vos identifiants sont incorrects')
        setConnexion(false)
    }

    return (
        <Container className='bg-grey col-8'>
            <h2 className='cinzel text-center mt-3'>Connexion</h2>
            <form onSubmit={handleSubmit}  className='d-flex flex-column col-6 d-flex justify-content-center mx-auto'>
                <label htmlFor="email">Votre adresse mail:</label>
                <input type="email" name="email" id="email" value={user.email} onChange={handleChange} onInvalid={()=>setErrMess('adresse mail au format invalide')} className='rounded'/>

                <label htmlFor="password">Votre mot de passe</label>
                <input type="password" name='password' id="password" value={user.password} onChange={handleChange} className='rounded'/>

                <input type="submit" value="Connexion" className='mt-4 btn btn-success resorb-bg' />
            </form>
            {errMess && <p className='mt-2 text-center text-danger fw-bold'>{errMess}</p>}
            <Link to='/signup' className='d-flex justify-content-end text-dark'>Vous n'avez pas de compte ?</Link>
            {connexion && <p>Chargement en cours...</p>}
        </Container>
    )
}