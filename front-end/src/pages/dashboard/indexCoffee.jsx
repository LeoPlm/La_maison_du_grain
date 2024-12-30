import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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

    if(error) return <p>Problème de connexion avec la base de données</p>

  return (
    <>
      {coffee.map( x =>(
        <div key={x._id} style={{ display: "flex", alignItems: "center", gap: "10px", }}>
          {x.name} <img src={`http://localhost:8000${x.picture.img}`} alt={x.name} width={150} /> 
          <Link to={{pathname: `/dashboard/updatecoffee/${x._id}`}}><button>Modifier</button></Link>
        </div>
      ))}
      <Link to={{pathname:'/dashboard/addcoffee'}}><button>Ajouter un nouveau café</button></Link>
      
    </>
  )
}