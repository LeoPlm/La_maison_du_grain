import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as ACTIONS from '../redux/reducer/article.reducer.js'
import { ADD_TO_CART } from '../redux/reducer/cart.reducer.js'; 
import { Container, Row, Col } from "react-bootstrap";
import '../styles/details.css'

export const Details = () => {

    const dispatch = useDispatch()
    const store = useSelector(state => state.article.dataArticleId)
    const {id} = useParams()
    const [error, setError] = useState(null)
    const [numberOfCoffee, setNumberOfCoffee] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    useEffect(() =>{
        const fetchArticle = async () =>{
            dispatch(ACTIONS.FETCH_ARTICLE_START())
            try{
                const response = await fetch(`http://localhost:8000/api/article/get/${id}`)
                const data = await response.json()
                dispatch(ACTIONS.FETCH_ARTICLEID_SUCCESS(data))
            }catch(err){
                setError(err.message)
            }
        }
        fetchArticle()
    }, [id,dispatch])

    const handleClick = (store) => {
        console.log(store)
        dispatch(ADD_TO_CART({article: store, numberOfCoffee}))
        setNumberOfCoffee(1)
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 3000)
    }

    const handleClickPlus = () =>{
        setNumberOfCoffee(prevNumber => (
            prevNumber >= 9 ? 9 : prevNumber +1
        ))
    }

    const handleClickLess = () =>{
        setNumberOfCoffee(prevNumber => (
            prevNumber <= 1 ? 1 : prevNumber -1
        ))
    }

    if(error) return <p>Problème de connexion au serveur</p>
    if (!store) return <p>Chargement en cours...</p>
    
    return (
        <>
        <Container className="d-flex flex-column">
            <h4 className="mt-3">
                <span className="bg-brown-light rounded p-1 cinzel">{store.name}</span>
            </h4>
            {store?.picture && Object.values(store.picture).map((x, i) => (
                <div 
                    key={i} 
                    className="d-inline-flex justify-content-center my-3 p-2 custom-negative-margin" 
                >
                    <img 
                        src={`http://localhost:8000${x}`} 
                        alt={store.name} 
                        width={200} 
                        className="rounded"
                    />
                </div>
            ))} 
            <div>
            </div>
            <div className="bg-brown-light mt-3 d-flex flex-column rounded mx-auto col-8">
                <h5 className="fw-bold d-flex ms-3 mt-2">{`café du ${store.from}`}</h5>
                <p className="ms-3"><i>Intensité du café</i> - {store.intensity}/10</p>
                <span className="text-decoration-underline ms-3">Description :</span>
                <p className="ms-3">{store.content}</p>
                <p className="ms-3"> <i>Poids</i> : 250g</p>
            </div>
            
            <select className="col-7 mx-auto mt-3">
                <option value="grain">Mouture: Grain</option>
                <option value="moulu">Mouture: Moulu</option>
            </select>
            

            <Row className="mx-auto mt-3">
                <Col xs="auto">
                    <button onClick={handleClickLess} aria-label="Diminuer la quantité">-</button>
                    <span className="mx-2 bg-white w-100">{numberOfCoffee}</span>
                    <button onClick={handleClickPlus} aria-label="Augmenter la quantité">+</button>
                </Col>
                <Col xs="auto">
                    <button onClick={() => handleClick(store)}>Ajouter au panier</button>
                </Col>
                <Col xs={12} className="mt-2">
                    {addedToCart && <p className="text-success">Votre article a bien été ajouté au panier !</p>}
                </Col>
                <Col>
                    <p className="bg-brown-light d-inline-block rounded p-2">Prix : {(store.price)*numberOfCoffee} €</p>
                </Col>
            </Row>
            </Container>
            </>
    )
}