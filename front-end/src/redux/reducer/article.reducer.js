import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    dataArticleId: {},
    loading: null,
    error: false
}

export const Article = createSlice({
    name: "Article",
    initialState,
    reducers:{
        FETCH_ARTICLE_START: (state) =>{
            state.loading = true
        },
        FETCH_ARTICLE_SUCCESS: (state, actions) =>{
            state.loading = false
            state.data = actions.payload
        },
        FETCH_ARTICLEID_SUCCESS: (state,actions) =>{
            state.loading = false
            state.dataArticleId = actions.payload
        },
        POST_ARTICLE_SUCCESS: (state, actions) =>{
            state.loading = false
            state.data.push(actions.payload)
        },
        POST_ARTICLE_FAILURE: state =>{
            state.error = true
            state.loading = 'Echec de la création de l\'article'
        },
        UPDATE_ARTICLE_SUCCESS: (state, actions) =>{
            const index = state.data.findIndex(item => item._id === actions.payload._id)
            if(index !== -1){
                state.data[index] = actions.payload
            }
        },
        UPDATE_ARTICLE_FAILURE: state =>{
            state.loading = false
            state.error = 'Echec de la maj de l\'article'
        }
    }
})

// Export des actions pour les utiliser dans les composants
export const {FETCH_ARTICLE_START, FETCH_ARTICLE_SUCCESS,FETCH_ARTICLEID_SUCCESS,POST_ARTICLE_SUCCESS, POST_ARTICLE_FAILURE, UPDATE_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAILURE} = Article.actions

// Export du reducer pour l'ajouter au state
export default Article.reducer