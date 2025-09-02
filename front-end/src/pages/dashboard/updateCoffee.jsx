import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import * as ACTIONS from '../../redux/reducer/article.reducer.js'
import { Container } from "react-bootstrap"
import { API_URL } from "../../config/api.js"

export const UpdateCoffee = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    
    const [coffee, setCoffee] = useState({
        name: '',
        content: '',
        price: 0,
        intensity: 0,
        stock: 0,
        type: '',
        from: '',
        img: []
    })

    useEffect(()=>{
        const fetchCoffee = async () =>{
            dispatch(ACTIONS.FETCH_ARTICLE_START())
            try{
                const response = await axios.get(`${API_URL}/api/article/get/${id}`)
                setCoffee(response.data)
                dispatch(ACTIONS.UPDATE_ARTICLE_SUCCESS)
            }catch(err){
                console.error(err.message)
                dispatch(ACTIONS.UPDATE_ARTICLE_FAILURE())
            }
        }
        fetchCoffee()
    }, [dispatch, id])

    const handleChange = (e) =>{
        const {value, name} = e.target
        setCoffee(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            await axios.put(`${API_URL}/api/article/update/${id}`, coffee)
            alert("article modifié avec succes")
        }catch(err){
            console.log(err)
        }
    }

    const deleteImg = (imgKey) => {
        // Crée une copie de l'objet picture sans la clé imgKey
        const updatedPicture = { ...coffee.picture };
        delete updatedPicture[imgKey];
        
        // Mets à jour l'état avec le nouvel objet picture sans l'image supprimée
        setCoffee(prev => ({
            ...prev,
            picture: updatedPicture
        }))
    }

    return (
        <Container>
            <h2 className="text-center mt-3 cinzel">Modifier café</h2>
            <form className="d-flex flex-column col-xl-6 mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="name">Nom du café:</label>
                <input class="form-control" type="text" name="name" id="name" value={coffee.name} onChange={handleChange}/>

                <label htmlFor="content">Description:</label>
                <textarea class="form-control" name="content" id="content" value={coffee.content} onChange={handleChange}></textarea>

                <label htmlFor="from">Origine:</label>
                <input class="form-control" name="from" id="from" value={coffee.from} onChange={handleChange}/>

                <label htmlFor="price">Prix:</label>
                <input class="form-control" type="number" name="price" id="price" step="0.01" value={coffee.price} onChange={handleChange}/>

                <label htmlFor="intensity">Intensité sur 10:</label>
                <input class="form-control" type="number" name="intensity" id="intensity" max="10" min="0" value={coffee.intensity} onChange={handleChange}/>
                
                <label htmlFor="stock">Articles en stock:</label>
                <input class="form-control" type="number" name="stock" id="stock" min="1" value={coffee.stock} onChange={handleChange}/>
                
                <label htmlFor="type">Type ('grain' ou 'moulu'):</label>
                <select class="form-select" id="type" name="type" value={coffee.type} onChange={handleChange}>
                    <option value="" disabled>--Choisir un type--</option>
                    <option value="grain">Grain</option>
                    <option value="moulu">Moulu</option>
                </select>

                {coffee.picture && Object.entries(coffee.picture).map(([key, value], i) => (
                <div className="mt-3" key={i}>
                    <img src={`${API_URL}${value}`} alt={`Image ${key}`} width={200}/>
                    <button className="btn btn-danger ms-2" onClick={() => deleteImg(key)}>Supprimer l'image</button>
                </div>
                ))}


                <input type="submit" className="btn btn-success resorb-bg mt-4" value="Ajouter à l'lindex" />
            </form>
        </Container>
    )
}