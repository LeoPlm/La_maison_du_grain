import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
// Actions redux
import * as ACTIONS from '../redux/reducer/article.reducer.js'
import { Container, Card, Col, Row } from "react-bootstrap"


export const ArticlesView = () => {
    const dispatch = useDispatch() 

    const store = useSelector(state => state.article.data)

    const [err, setErr] = useState(null)

    useEffect(() => {
        const fetchArticle = async () =>{
            dispatch(ACTIONS.FETCH_ARTICLE_START())
            try{
                const response = await fetch(`http://localhost:8000/api/article/get`)
                const data = await response.json()
                dispatch(ACTIONS.FETCH_ARTICLE_SUCCESS(data))
            } catch (err){
                setErr(err.message)
            }  
        }
        fetchArticle()
    }, [dispatch])

    if(err) return <p>Erreur de connexion</p>
    
    return (
        <div>
            <div className="bg-sand col-8 d-flex flex-column mt-4 mx-auto rounded p-3">
                <h2 className="d-flex justify-content-center cinzel">Les cafés</h2>
                <p className="montserrat">Découvrez nos cafés,
                uniques et raichement torréfiés en France. Chaque grain reflète notre passion pour l’excellence et l’équité. Profitez de nos aromes riches et d’une fraicheur remarquable à chaque tasse.
                </p>
            </div>
            
            <Container className="mt-5">
                <Row>
                    {store &&
                        store.map((x) => (
                            <Col key={x._id} md={6} lg={4} xl={6} className="mb-4 d-flex justify-content-center">
                                <Card className="h-100 shadow-sm text-center" style={{ width: "17rem" }}>
                                    <Link to={`/detail/${x._id}`} className="text-decoration-none">
                                        <Card.Img
                                            variant="top"
                                            src={
                                            x.picture?.img
                                                ? x.picture.img.startsWith("http")
                                                ? x.picture.img
                                                : `http://localhost:8000${x.picture.img}`
                                                : "https://via.placeholder.com/200"
                                            }
                                            alt={x.name}
                                            style={{ height: "150px", objectFit: "cover" }}
                                        />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className="text-dark" style={{ fontSize: "1rem" }}>{x.name}</Card.Title>
                                        <Card.Text className="text-muted bg-brown-dark w-25 mx-auto" style={{ fontSize: "0.9rem" }}>{x.price} €</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                    ))}
                </Row>
            </Container>
            
        </div>
    )
}