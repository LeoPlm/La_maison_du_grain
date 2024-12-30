import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const ArticlesView = () => {

    const [articles,setArticles] = useState([])

    const [err, setErr] = useState(null)

    useEffect(() => {
        
            const fetchArticle = async () =>{
                try{
                    const response = await fetch(`http://localhost:8000/api/article/get`)
                    const data = await response.json()
                    setArticles(data)
                } catch (err){
                    setErr(err.message)
                }  
            }
            fetchArticle()
    }, [])

    if(err) return <><p>Erreur de connexion</p></>
    
    return (
        <div>
            <h1>ArticlesView</h1>
            
                {articles.map( x =>(
                    <div key={x._id}>
                        <Link to={{pathname: `/detail/${x._id}`}}>
                            <img src={x.picture?.img ? x.picture.img.startsWith("http") ? x.picture.img : `http://localhost:8000${x.picture.img}` : null } 
                            alt={x.name} width={200} />
                        </Link>
                        <p>{x.name}</p>
                        <p>{x.price} €</p>
                    </div>
                ))}
            
        </div>
    )
}