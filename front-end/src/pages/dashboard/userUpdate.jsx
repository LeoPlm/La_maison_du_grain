import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserById, UPDATE_USER, updateUser } from "../../redux/reducer/user.reducer"

export const UserUpdate = () => {

  const dispatch = useDispatch()
  const {id} = useParams()
  const {dataUserId, loading} = useSelector(state => state.user)

  useEffect(()=>{
    const fetchUser = () =>{
      dispatch(fetchUserById(id))
    }
    fetchUser()
  },[dispatch, id])

  const handleChange = (e) =>{
    const {name, value} = e.target
    console.log(dataUserId.adresse[0])
    if(name === "rue"){
      dispatch(UPDATE_USER({...dataUserId, adresse: [{...dataUserId.adresse[0], [name] : value}]}))
    }else if(name === "ville" || name === 'code_postal'){
      dispatch(UPDATE_USER({...dataUserId, adresse: [{...dataUserId.adresse[0], ville : {...dataUserId.adresse[0]?.ville, [name ==='ville' ? 'nom' : 'code_postal']: value}}]}))
    } else {
      dispatch(UPDATE_USER({...dataUserId, [name] : value}))
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(updateUser({id, payload: dataUserId}))
  }

  return (
    <div>

      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "20%", gap: "1em", marginLeft: "0.25em"}}>
        <label htmlFor="firstName">Prénom</label>
        <input type="text" id="firstName" name="prenom" value={dataUserId.prenom} onChange={handleChange}/>

        <label htmlFor="lastName">Nom</label>
        <input type="text" id="last" name="nom" value={dataUserId.nom} onChange={handleChange}/>

        <label htmlFor="email">Adresse mail</label>
        <input type="email" id="email" name="email" value={dataUserId.email} onChange={handleChange}/>

        <label htmlFor="role">Statut</label>
        <select name="role" id="role" value={dataUserId.role} onChange={handleChange}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <fieldset style={{display: "flex",justifyContent: "start", alignItems: "start", flexDirection:"column"}}>
          <legend>Adresse</legend>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="street">Rue</label>
            <input type="text" id="street" name="rue" value={dataUserId.adresse?.[0] ? dataUserId.adresse?.[0].rue : ''} onChange={handleChange}/>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="city">Ville</label>
            <input type="text" id="city" name="ville" value={dataUserId.adresse?.[0] ? dataUserId.adresse?.[0].ville?.nom : ''} onChange={handleChange}/>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="cp">Code postal</label>
            <input type="text" id="cp" name="code_postal" maxLength="5" pattern="\d{5}" title="Veuillez entrer un code postal" value={dataUserId.adresse?.[0] ? dataUserId.adresse?.[0].ville?.code_postal : ''} onChange={handleChange}/>
          </div>
        </fieldset>
        <input type="submit" value="Mettre à jour"/>
      </form>
    </div>
  )
}