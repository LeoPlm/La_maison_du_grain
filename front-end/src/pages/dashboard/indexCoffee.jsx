import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"

export const IndexCoffee = () => {

    const [coffee, setCoffee] = useState([])
    const [error, setError] = useState(null)

    useEffect(() =>{
      const fetchCoffee = async () =>{
        try{
          const response = await fetch(`http://localhost:8000/api/article/get`)
          const data = await response.json()
          setCoffee(data)
        }catch(err){
          setError(err.message)
        }
      }
      fetchCoffee()
    },[])

    const handleClick = async(articleId) =>{
      const deleteCoffee = async() =>{
        try{
          await axios.delete(`http://localhost:8000/api/article/delete/${articleId}`)
          setCoffee(prev => prev.filter(x => x._id !== articleId))
        }catch(err){
          setError(true)
          console.log(err.message)
        }
      }
      deleteCoffee()
    }

    if(error) return <p>Problème de connexion avec la base de données</p>

  return (
    <Container>
    <h2 className="cinzel text-center mt-3">Index des cafés</h2>

    {/* Ajout du conteneur table-responsive */}
    <div className="table-responsive">
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Image</th>
                    <th scope="col">Modifier</th>
                    <th scope="col">Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {coffee.map((x, i) => (
                    <tr key={x._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{x.name}</td>
                        <td>
                            <img 
                                src={`http://localhost:8000${x.picture.img}`} 
                                alt={x.name} 
                                width={100} 
                                className="img-fluid rounded"
                            />
                        </td>
                        <td>
                            <Link to={`/dashboard/updatecoffee/${x._id}`}>
                                <button className="btn btn-primary">Modifier</button>
                            </Link>
                        </td>
                        <td>
                          <button className="btn btn-danger" onClick={() =>handleClick(x._id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <Link to="/dashboard/addcoffee">
        <button className="btn btn-success mt-3">Ajouter un nouveau café</button>
    </Link>
</Container>

  )
}