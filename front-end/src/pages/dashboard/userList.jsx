import { useEffect, useState } from "react";
import axios from "axios"

export const UserList = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Pour gérer les erreurs

    useEffect(() => {
const fetchUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/user/get`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setError(err.message);
        console.error(err);
    }
};


        fetchUsers();
    }, []);

    return (
        <>
            {loading && <p>Attendez un moment...</p>}

            {error && <p>Erreur: {error}</p>}  {/* Afficher l'erreur si elle existe */}

            {users.length === 0 && !loading && !error && <p>Aucun utilisateur trouvé.</p>}

            {!loading && !error && users.map((x) => (
                <div key={x._id}>
                    <p>
                        prénom: {x.prenom}  nom: {x.nom} email: {x.email} role: {x.role} adresse: {x.adresse && x.adresse[0] ?`${x.adresse[0].rue} ${x.adresse[0].ville.nom}` : "Adresse non renseignée"}
                    </p>
                    <button>Modifier les info</button>
                </div>
            ))}
        </>
    );
};
