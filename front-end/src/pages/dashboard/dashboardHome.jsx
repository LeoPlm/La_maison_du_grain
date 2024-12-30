import { Link } from "react-router-dom"

export const DashboardHome = () => {
    return (
        <>
            <h1>Back Office : La Maison du grain</h1>
            <Link to={{pathname: '/dashboard/index'}}>Index des cafés</Link> <br />
            <Link to={{pathname: '/dashboard/userslist'}}>Liste des utilisateurs</Link> <br />
            <Link to={{pathname: '/dashboard/stat'}}>Statistiques des ventes</Link>
        </>
    )
}