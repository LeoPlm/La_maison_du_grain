import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/reducer/user.reducer";

export const UserList = () => {

    const {data, loading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <>
            {loading && <p>Attendez un moment...</p>}

            {error && <p>Erreur: {error}</p>}  {/* Afficher l'erreur si elle existe */}

            {data && data.length === 0 && !loading && !error && <p>Aucun utilisateur trouvé.</p>}

            {!loading && !error && data.map((x) => (
                <div key={x._id}>
                    <p>
                        prénom: {x.prenom}  nom: {x.nom} email: {x.email} role: {x.role} adresse: {x.adresse && x.adresse[0] ?`${x.adresse[0].rue} ${x.adresse[0]?.ville?.nom}` : "Adresse non renseignée"}
                    </p>
                    <Link to={ `/dashboard/userupdate/${x._id}`}>
                        <button>Modifier les info</button>
                    </Link>
                </div>
            ))}
        </>
    )
}
