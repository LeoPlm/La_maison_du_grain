import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Pour communiquer avec notre API
import axios from 'axios'

// Créer un context
export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // Etat pour suivre l'authentification
    const [isLoading, setIsLoading] = useState(false)

    // Etat pour stocker les infos du user connecté
    const [auth,setAuth] = useState(null)

    // Navigate
    const navigate = useNavigate()

    useEffect(()=>{
        isLoggedIn()
    }, [])

    const login = async (dataForm) =>{
        setIsLoading(true)
        try{
            const {data, status} = await axios.post(`http://localhost:8000/api/user/sign`, dataForm) 
            // {withCredentials: true} Pas besoin de le mettre car on l'a rajouté dans l'index axios. 
            console.log(data)
            if(status === 200){
                // Si tout est ok stocker les données du user dans le Localstorage, données stockées par le nav
                // On y met le strict minimum car c'est public
                localStorage.setItem('auth', JSON.stringify(data) ) // On définit la clé puis les données
                navigate('/')
            }

            // Met à jour le state
            setAuth(data)

            // isLoading à false après une authentification réussie
            setIsLoading(false)
        }catch(err){
            console.error(err.message)
            setIsLoading(false)
        }
    }

    const isLoggedIn = () =>{
        setIsLoading(true)
        try{
            // Recupere les données de l'utilisateur depuis le localStorage
            const authData = localStorage.getItem('auth')

            // Convertir le json pour qu'il soit lisible en js. Met à jour l'etat auth avec les données récupérées dans le localStorage en JS.
            setAuth(authData ? JSON.parse(authData) : null) 

            setIsLoading(false)
        } catch(e){
            console.log(e.message)
        }
    }

    const logout = () =>{
        setIsLoading(true)
        setAuth(null) //réinitialise l'etat du state auth à null
        localStorage.removeItem('auth') //Supprime les info du localStorage  
        navigate(`/`)
        setIsLoading(false)
    }

    return(
        <>
        <AuthContext.Provider value={{login, logout, auth, isLoading}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}