import {Link, NavLink} from 'react-router-dom'
import { useContext } from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import './header.css'
import {AuthContext} from '../context/AuthContext.jsx'

export default function Header() {
    const { logout, auth, isLoading } = useContext(AuthContext)
    return (
        <header className='custom-brown '>
            <Navbar expand="lg" variant="dark" className='p-3'>
                <Container>
                    <Navbar.Brand className='lobster-font text-dark fs-3'>
                        <NavLink className='nav-item nav-link title-link' to="/">
                            La Maison du Grain
                        </NavLink>
                        
                    </Navbar.Brand>

                    {auth && 
                        <NavLink className='nav-item nav-link' to="/profile">
                            <i className="bi bi-person-fill-check fs-2"></i>
                        </NavLink>
                    }

                    { 
                        <NavLink className='ms-2 nav-item nav-link' to="/cart">
                            <i class="bi bi-cart fs-2"></i>
                        </NavLink>
                    }
                    
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>

                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto montserrat'>
                        <NavLink className='nav-item nav-link montserrat' to="/"> Home </NavLink>
                        <NavLink className='nav-item nav-link' to="/articlesview"> Voir nos produits </NavLink>
                        {auth && <NavLink className='nav-item nav-link' to="/profile">Mon compte</NavLink>}
                        <NavLink className='nav-item nav-link' to="/quisommesnous">Qui sommes-nous ?</NavLink>
                        <NavLink className='nav-item nav-link' to="/contact">Nous contacter</NavLink>
                        {!auth && <NavLink className='nav-item nav-link' to="/signup">Inscription</NavLink>}
                        <NavLink className='nav-item nav-link' to="/cart">Panier</NavLink>
                        {auth && auth.role === "admin" && (
                            <NavLink className='nav-item nav-link' to="/dashboard">Dashboard</NavLink>
                        )}
                        {auth ? (
                            <Button variant="outline-light" onClick={logout}>Déconnexion</Button>
                        ) : (
                        <Button variant="light" as={Link} to="/login">Connexion</Button>
                        )}
                        {isLoading && (
                            <div className="ms-3 d-flex align-items-center">
                                <div className="spinner-border text-light" role="status" style={{width: "1.5rem", height: "1.5rem"}}>
                                <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    )
}