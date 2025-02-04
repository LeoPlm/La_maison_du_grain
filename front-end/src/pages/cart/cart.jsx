import { useDispatch } from "react-redux"
import { DELETE_CART } from "../../redux/reducer/cart.reducer"
import { useEffect, useState } from "react"
export const Cart = () => {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart'))|| [])
  const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem('cartTotalPrice')))
  const dispatch = useDispatch()

  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(items))
    localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice))
    
  },[items, totalPrice])

  const handleClick = () =>{
    dispatch(DELETE_CART())
    setItems([])
    setTotalPrice(0)
  }

  return (
    <div>
      {items.length=== 0 ? (
        <p>Pas d'articles dans le panier</p>
      ) : (
        <>
        <p>Bonjour, vous avez commandé : </p>
        <br />
        {items.map( x=>(
          <p key={x._id}>
            {x.quantity} {x.name}, soit {x.price * x.quantity} €
          </p>
        ))
        }
        <p>Cela représente un total de {totalPrice} €</p>
        <button onClick={handleClick}>Supprimer le panier</button>
        <button>Payer</button>
        </>
      )}
    </div>
  )
}