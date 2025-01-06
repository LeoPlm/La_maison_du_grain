import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as ACTIONS from '../redux/reducer/article.reducer.js'

export const Details = () => {

    const dispatch = useDispatch()
    const store = useSelector(state => state.article.dataArticleId)
    const {id} = useParams()
    const [error, setError] = useState(null)

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

    if(error) return <p>Problème de connexion au serveur</p>
    if (!store) return <p>Chargement en cours...</p>;
    
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
            
        </>
    )
}