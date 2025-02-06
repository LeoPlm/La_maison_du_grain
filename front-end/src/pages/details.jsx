import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as ACTIONS from '../redux/reducer/article.reducer.js'
import { ADD_TO_CART } from '../redux/reducer/cart.reducer.js'; 

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
            <h1>{store.name} </h1>
            {/* Besoin de convertir picture en tableau donc utilisation de Object.values */}
            {store.picture ? Object.values(store.picture).map((x,i) => (
                <img key={i}
                src={`http://localhost:8000${x}`}
                alt={store.name}
                width={200} />   
            )) : null } 
            <p>Description : {store.content}</p>
            <p>Origine: {store.from}</p>
            <p>Grain/Moulu: {store.type}</p>
            <p>Intensité: {store.intensity}</p>
            <p>Prix: {store.price} €</p>
            <button onClick={handleClickPlus}>+</button>
            <span>{numberOfCoffee}</span>
            <button onClick={handleClickLess}>-</button>
            <button onClick={() => handleClick(store)}>Ajouter au panier</button>
            {addedToCart && <p style={{color: "green"}}>Votre article a bien été ajouté au panier !</p>}
        </>
    )
}