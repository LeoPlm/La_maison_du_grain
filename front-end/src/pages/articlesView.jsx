import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
// Actions redux
import * as ACTIONS from '../redux/reducer/article.reducer.js'


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
            <h1>ArticlesView</h1>
            {store && store.map( x =>(
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