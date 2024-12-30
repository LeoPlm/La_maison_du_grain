import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Details = () => {

    const {id} = useParams()

    const [article, setArticle] = useState()
    const [error, setError] = useState(null)

    useEffect(() =>{
        const fetchArticle = async () =>{
            try{
                const response = await fetch(`http://localhost:8000/api/article/get/${id}`)
                const data = await response.json()
                setArticle(data)
            }catch(err){
                setError(err.message)
            }
            
        }
        fetchArticle()
    }, [id])

    if(error) return <p>Problème de connexion au serveur</p>
    if (!article) return <p>Chargement en cours...</p>;

    return (
        <>
                    <h1>{article.name} </h1>
                    {/* Besoin de convertir picture en tableau donc utilisation de Object.values */}
                    {Object.values(article.picture).map((x,i) => (
                        <img key={i}
                        src={`http://localhost:8000${x}`}
                        alt={article.name}
                        width={200} />   
                    ))} 
                    <p>Description : {article.content}</p>
                    <p>Origine: {article.from}</p>
                    <p>Grain/Moulu: {article.type}</p>
                    <p>Intensité: {article.intensity}</p>
                    <p>Prix: {article.price} €</p>
            
        </>
    )
}