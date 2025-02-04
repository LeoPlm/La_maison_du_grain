import {Link, NavLink} from 'react-router-dom'
import { useContext } from 'react'
import './header.css'
import {AuthContext} from '../context/AuthContext.jsx'

export default function Header() {
    const { logout, auth } = useContext(AuthContext)
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/'
                        // Pas obligatoire:
                        className={({isActive}) => isActive ? 'active' : 'inactive' }> 
                        Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/articlesview'>Voir nos produits</NavLink>
                    </li>
                    <li>
                        {auth && auth.isVerified  && 
                            <NavLink to='/profile'>Profil</NavLink>
                        }
                    </li>
                    <li>
                        {auth && auth.isVerified  && 
                            <NavLink to='/quisommesnous'>Qui sommes-nous ?</NavLink>
                        }
                    </li>
                    <li>
                        {auth && auth.isVerified  && 
                            <NavLink to='/contact'>Nous contacter</NavLink>
                        }
                    </li>
                    <li>
                        {!auth && 
                            <NavLink to='/signup'>Inscription</NavLink>
                        }
                    </li>
                    <li>
                            <NavLink to='/cart'>Panier</NavLink>
                    </li>
                    <li>
                        {auth && auth.role === 'admin' && 
                            <NavLink to='/dashboard'>DashBoard</NavLink>
                        }
                    </li>
                    <li>
                        {auth ?
                        <button onClick={logout}> Déconnexion </button>
                        :
                        <Link to='/login'>Connexion</Link>
                        }
                    </li>
                </ul>
                
            </nav>
        </header>
    )
}