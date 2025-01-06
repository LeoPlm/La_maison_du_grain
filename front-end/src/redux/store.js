import {configureStore} from '@reduxjs/toolkit'

// Reducers
import  Article  from './reducer/article.reducer'
import

export default configureStore({
    reducer: {
        article: Article,
        cart: Cart
    }
})
