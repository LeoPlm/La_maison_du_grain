import {configureStore} from '@reduxjs/toolkit'

// Reducers
import Article  from './reducer/article.reducer'
import Cart from './reducer/cart.reducer'
import User from './reducer/user.reducer' 

export default configureStore({
    reducer: {
        article: Article,
        cart: Cart,
        user: User
    }
})
