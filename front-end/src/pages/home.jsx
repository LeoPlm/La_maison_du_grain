import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <h1>Bienvenue !</h1> 
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis facilis eligendi error dolorum a! Impedit sint officia rerum iusto amet perferendis, animi natus nulla aliquid! Ipsam necessitatibus esse ex accusantium?</p>

            <Link to={{pathname: '/articlesview'}}>
                <p>Le super link pour voir les articles</p>
            </Link>
        </div>
    )
}