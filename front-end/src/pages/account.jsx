import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserByIdAsUser, UPDATE_USER_AS_USER, updateUserAsUser } from "../redux/reducer/user.reducer"
import {Container} from 'react-bootstrap'

export const Account = () => {

  const dispatch = useDispatch()
  const {dataUser = {}, loading} = useSelector(store => store.user)

  useEffect(() =>{
    const fetchUser = () => {
      dispatch(fetchUserByIdAsUser())
    }
    fetchUser()
  },[dispatch])

  const handleChange = (e) =>{
    const {name, value} = e.target
    console.log(value)
    if(name === "rue"){
      dispatch(UPDATE_USER_AS_USER({...dataUser, adresse: [{...dataUser.adresse[0], [name] : value}]}))
    }else if(name === "ville" || name === 'code_postal'){
      dispatch(UPDATE_USER_AS_USER({...dataUser, adresse: [{...dataUser.adresse[0], ville : {...dataUser.adresse[0]?.ville, [name ==='ville' ? 'nom' : 'code_postal']: value}}]}))
    } else {
      dispatch(UPDATE_USER_AS_USER({...dataUser, [name] : value}))
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(updateUserAsUser({payload: dataUser}))
    .then(() => dispatch(fetchUserByIdAsUser()))
  }
  
  if(loading) return <p>Chargement en cours...</p>

  return (
    <Container>
      <h2 className="cinzel bg-brown-light text-center mt-3 resorb-bg rounded p-2 d-flex mx-auto">Mon compte</h2>
      <div className="bg-brown-light col-xl-8 mx-auto rounded">
        <form onSubmit={handleSubmit} className="d-flex flex-column bg-brown-light p-3 rounded col-xl-8 mx-auto mt-3">
          <label htmlFor="firstName">Prénom</label>
          <input class="form-control" type="text" id="firstName" name="prenom" value={dataUser.prenom} onChange={handleChange}/>

          <label htmlFor="lastName">Nom</label>
          <input class="form-control" type="text" id="last" name="nom" value={dataUser.nom} onChange={handleChange}/>

          <label htmlFor="email">Adresse mail</label>
          <input class="form-control" type="email" id="email" name="email" value={dataUser.email} onChange={handleChange}/>

          <label htmlFor="role">Statut</label>
          <select name="role" id="role" value={dataUser.role} onChange={handleChange}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <fieldset>
            <legend>Adresse</legend>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="street">Rue</label>
              <input className="form-control" type="text" id="street" name="rue" value={dataUser.adresse?.[0]?.rue || ""} onChange={handleChange}/>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="city">Ville</label>
              <input type="text" id="city" name="ville" value={dataUser.adresse?.[0]?.ville?.nom || ""} onChange={handleChange} className="form-control"/>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="cp">Code postal</label>
              <input class="form-control" type="text" id="cp" name="code_postal" maxLength="5" pattern="\d{5}" title="Veuillez entrer un code postal" value={dataUser.adresse?.[0]?.ville?.code_postal || ""} onChange={handleChange}/>
            </div>
          </fieldset>
          <input type="submit" value="Mettre à jour" class="btn btn-dark border-0 mt-4 resorb-bg"/>
        </form>
      </div>
    </Container>
  )
}