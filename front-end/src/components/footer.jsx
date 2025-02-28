import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer className='bg-brown-dark mt-5'>
        <Container>
            <div className='row d-flex justify-content-end'>
                <div className='col-6'>
                    <h4 className='d-flex justify-content-center me-5 fw-bold'>Suivez-nous</h4>
                    <div className='row g-1'>
                        <div className="col-4" >
                            <a href="https://x.com/?lang=fr"><i class="bi bi-twitter text-dark fs-3"></i></a>
                        </div>
                        <div className="col-4" >
                            <a href="https://www.instagram.com/"><i class="bi bi-instagram text-dark fs-3"></i></a>
                        </div>
                        <div className="col-4">
                            <a href="https://www.linkedin.com/"><i class="bi bi-linkedin text-dark fs-3"></i></a>
                        </div>
                    </div>
                </div>
                <div className='col-6 d-flex flex-column text-dark'>
                    <h4 className='fw-bold d-flex justify-content-center'>Plus d'informations</h4>
                    <NavLink to="/contact" className='text-dark text-decoration-none d-flex justify-content-center me-5'>Contactez-nous</NavLink>
                    <NavLink to="/quisommesnous" className='text-dark text-decoration-none d-flex justify-content-center me-5'>A propos de nous</NavLink>
                    <NavLink to="#" className='text-dark text-decoration-none d-flex justify-content-center me-5'>Mentions Légales</NavLink>
                </div>
                <p className='mt-4 d-flex justify-content-center fs-6 fw-bold'>Copyright © La maison du grain 2024</p>
            </div>
        </Container>
        </footer>
    )
}

export default Footer
