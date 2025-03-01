import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"

export const DashboardHome = () => {

    const {auth} = useContext(AuthContext)
    console.log(auth)

    return (
        <Container className="d-flex flex-column border">
            <h2 className="text-center cinzel mt-3">Back Office : La Maison du grain</h2>
            <p className="text-center fs-6 text-secondary">Session admin: {`${auth.prenom} ${auth.nom}`}</p>
            <Row className="bg-grey border border-2 border-dark d-flex mx-auto border flex-column align-items-center col-8">
                <Col className="col-10 d-flex flex-column align-items-center">
                    <Link to={{pathname: '/dashboard/index'}} className="d-flex border mx-auto text-decoration-none text-dark bg-brown-dark mt-2 p-1 mb-5 ">Index des cafés</Link> 
                    <Link to={{pathname: '/dashboard/userslist'}} className="d-flex border mx-auto text-decoration-none text-dark bg-brown-dark p-1 mb-5">Liste des utilisateurs</Link> 
                    <Link to={{pathname: '/dashboard/stat'}} className=" mb-2 d-flex border mx-auto text-decoration-none text-dark bg-brown-dark p-1">Statistiques des ventes</Link>
                </Col>
            </Row>
        </Container>
    )
}