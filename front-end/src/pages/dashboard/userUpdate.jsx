import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserById, UPDATE_USER, updateUser } from "../../redux/reducer/user.reducer"
import { Container } from "react-bootstrap"

export const UserUpdate = () => {

  const dispatch = useDispatch()
  const {id} = useParams()
  const {dataUserAsAdmin = {}, loading} = useSelector(state => state.user)

  useEffect(()=>{
    const fetchUser = () =>{
      dispatch(fetchUserById(id))
    }
    fetchUser()
  },[dispatch, id])

  const handleChange = (e) =>{
    const {name, value} = e.target
    if(name === "rue"){
      dispatch(UPDATE_USER({...dataUserAsAdmin, adresse: [{...dataUserAsAdmin.adresse[0], [name] : value}]}))
    }else if(name === "ville" || name === 'code_postal'){
      dispatch(UPDATE_USER({...dataUserAsAdmin, adresse: [{...dataUserAsAdmin.adresse[0], ville : {...dataUserAsAdmin.adresse[0]?.ville, [name ==='ville' ? 'nom' : 'code_postal']: value}}]}))
    } else {
      dispatch(UPDATE_USER({...dataUserAsAdmin, [name] : value}))
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(updateUser({id, payload: dataUserAsAdmin}))
    .then(() => dispatch(fetchUserById(id)))
  }

  if(loading) return <p>Chargement en cours...</p>

  return (
    <Container>

      <h2 className="text-center mt-3 cinzel">Modification utilisateur</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column col-xl-6 mx-auto">
        <label htmlFor="firstName">Prénom</label>
        <input type="text" id="firstName" name="prenom" value={dataUserAsAdmin.prenom} onChange={handleChange}/>

        <label htmlFor="lastName">Nom</label>
        <input type="text" id="last" name="nom" value={dataUserAsAdmin.nom} onChange={handleChange}/>

        <label htmlFor="email">Adresse mail</label>
        <input type="email" id="email" name="email" value={dataUserAsAdmin.email} onChange={handleChange}/>

        <label htmlFor="role">Statut</label>
        <select name="role" id="role" value={dataUserAsAdmin.role} onChange={handleChange}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <fieldset className="d-flex flex-column">
          <legend>Adresse</legend>
            <label htmlFor="street">Rue</label>
            <input type="text" id="street" name="rue" value={dataUserAsAdmin.adresse?.[0] ? dataUserAsAdmin.adresse?.[0].rue : ''} onChange={handleChange}/>

            <label htmlFor="city">Ville</label>
            <input type="text" id="city" name="ville" value={dataUserAsAdmin.adresse?.[0] ? dataUserAsAdmin.adresse?.[0].ville?.nom : ''} onChange={handleChange}/>

            <label htmlFor="cp">Code postal</label>
            <input type="text" id="cp" name="code_postal" maxLength="5" pattern="\d{5}" title="Veuillez entrer un code postal" value={dataUserAsAdmin.adresse?.[0] ? dataUserAsAdmin.adresse?.[0].ville?.code_postal : ''} onChange={handleChange}/>

        </fieldset>
        <input type="submit" value="Mettre à jour" className="btn btn-dark resorb-bg mt-3 border-0"/>
      </form>
    </Container>
  )
}