import { useState } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux";
import * as ACTIONS from '../../redux/reducer/article.reducer.js'

export const AddCofee = () => {
    const dispatch = useDispatch()
    const imgInput = ["img", "img1", "img2", "img3", "img4"];

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

    const handleChange = (e) =>{
        const {name, value, files} = e.target
        if(name.startsWith('img')){
            setCoffee( c =>({...c, img: files ?  [...c.img, ...Array.from(files)] : c.img}))
        }else {
            setCoffee( c => ({...c, [name]: value}))
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", coffee.name);
        formData.append("content", coffee.content);
        formData.append("type", coffee.type);
        formData.append("from", coffee.from)
        formData.append("price", parseInt(coffee.price));
        formData.append("stock", parseInt(coffee.stock));
        formData.append("intensity", parseInt(coffee.intensity));

        coffee.img.forEach((image, index) => {
            const imgName = index === 0 ? 'img' : `img${index}`
            formData.append(imgName, image);
        })
        try{
            const response = await axios.post(`http://localhost:8000/api/article/add`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            dispatch(ACTIONS.POST_ARTICLE_SUCCESS(response.data))
            console.log(formData)
        }catch(err){
            console.error(err.message)
            dispatch(ACTIONS.POST_ARTICLE_FAILURE())
        }
    }

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

                {imgInput.map((imgName, index) => (
                <div key={imgName}>
                <label>
                {index === 0 ? "Image principale (URL):" : `Image ${index} (URL):`}
                </label>
                <input
                type="file"
                name={imgName}
                onChange={handleChange}
                // slice prend le dernier caractère du nom de l'image
                // (par exemple, pour 'img1', il extrait '1')
                placeholder={`Image ${imgName.slice(-1)}`}
                />
                </div>
                ))}


                <input type="submit" value="Ajouter à l'lindex" />
            </form>
        </div>
    )
}