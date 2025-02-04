import { createSlice } from "@reduxjs/toolkit";

const getStorage = x => (
    JSON.parse(localStorage.getItem(x))
)
const setStorage = (storageName,item) =>{
    localStorage.setItem(storageName, JSON.stringify(item))
}

const initialCartState = {
    items : getStorage('cart') || [],
    totalQuantity : getStorage('cartQuantity') || 0,
    totalPrice: getStorage('cartTotalPrice') || 0,
}

export const Cart = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            const {article, numberOfCoffee} = action.payload
            const existingItem = state.items.find(item => item.id === article._id)
            if(existingItem){
                existingItem.quantity += numberOfCoffee
            }else{
                state.items.push({ ...article, quantity: numberOfCoffee})
            }

            state.totalQuantity += numberOfCoffee
            state.totalPrice += article.price * numberOfCoffee

            setStorage('cart', state.items)
            setStorage('cartQuantity', state.totalQuantity)
            setStorage('cartTotalPrice', state.totalPrice)
        },
        DELETE_CART: (state) =>{
            state.items = []
            state.totalQuantity = 0
            state.totalPrice = 0;
            ["cart", "cartQuantity", "cartTotalPrice"].forEach(x => localStorage.removeItem(x))
        }
    }
})

export const { ADD_TO_CART, DELETE_CART} = Cart.actions

export default Cart.reducer