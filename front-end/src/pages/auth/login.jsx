import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

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
    };

    return (
        <>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Votre adresse mail:</label>
            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} onInvalid={()=>setErrMess('adresse mail au format invalide')}/>

            <label htmlFor="password">Votre mot de passe</label>
            <input type="password" name='password' id="password" value={user.password} onChange={handleChange}/>

            <input type="submit" value="Je me connecte!" />
        </form>
        {errMess && <p>{errMess}</p>}
        <Link to='/signup'>Vous n'avez pas de compte ?</Link>
        {connexion && <p>Chargement en cours...</p>}
        </>
    )
}