import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/reducer/user.reducer";
import {Container} from 'react-bootstrap'

export const UserList = () => {

    const {data, loading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <Container className='mt-3'>
            {loading && <p>Attendez un moment...</p>}

            {error && <p>Erreur: {error}</p>}

            {data && data.length === 0 && !loading && !error && <p>Aucun utilisateur trouvé.</p>}

            
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Modifier les info</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && !error && data?.map((user, i) =>(
                        <tr key={user.id}>
                        <th scope="row">{i+1}</th>
                        <td>{user.prenom}</td>
                        <td>{user.nom}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.adresse && user.adresse[0] ?`${user.adresse[0].rue} ${user.adresse[0]?.ville?.nom}` : "Adresse non renseignée"}</td>
                        <td>
                            <Link to={ `/dashboard/userupdate/${user._id}`}>
                                <button className="btn btn-primary">Modifier les info</button>
                            </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}
