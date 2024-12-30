import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export const UpdateCoffee = () => {
    const {id} = useParams()

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
            try{
                const response = await axios.get(`http://localhost:8000/api/article/get/${id}`, coffee)
                setCoffee(response.data)
            }catch(err){
                console.error(err.message)
            }
        }

        fetchCoffee()
        
    }, [id])

    useEffect(() => {
        console.log(coffee)
    }, [coffee])

    const handleChange = (e) =>{
        const {value, name} = e.target
        setCoffee(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await axios.put(`http://localhost:8000/api/article/update/${id}`, coffee)
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
        }));
    };
    
    

    return (
        <div>
            <form style={{display: "flex", flexDirection: "column", width: "10%"}} onSubmit={handleSubmit}>
                <label htmlFor="name">Nom du café:</label>
                <input type="text" name="name" id="name" value={coffee.name} onChange={handleChange}/>

                <label htmlFor="content">Description:</label>
                <textarea name="content" id="content" value={coffee.content} onChange={handleChange}></textarea>

                <label htmlFor="from">Origine:</label>
                <input name="from" id="from" value={coffee.from} onChange={handleChange}/>

                <label htmlFor="price">Prix:</label>
                <input type="number" name="price" id="price" step="0.01" value={coffee.price} onChange={handleChange}/>

                <label htmlFor="intensity">Intensité sur 10:</label>
                <input type="number" name="intensity" id="intensity" max="10" min="0" value={coffee.intensity} onChange={handleChange}/>
                
                <label htmlFor="stock">Articles en stock:</label>
                <input type="number" name="stock" id="stock" min="1" value={coffee.stock} onChange={handleChange}/>
                
                <label htmlFor="type">Type ('grain' ou 'moulu'):</label>
                <select id="type" name="type" value={coffee.type} onChange={handleChange}>
                    <option value="" disabled>--Choisir un type--</option>
                    <option value="grain">Grain</option>
                    <option value="moulu">Moulu</option>
                </select>

                {coffee.picture && Object.entries(coffee.picture).map(([key, value], i) => (
                <div key={i}>
                    <img src={`http://localhost:8000${value}`} alt={`Image ${key}`} width={200}/>
                    <button onClick={() => deleteImg(key)}>Supprimer l'image</button>
                </div>
                ))}


                <input type="submit" value="Ajouter à l'lindex" />
            </form>
        </div>
    )
}