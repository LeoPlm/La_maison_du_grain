import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Recupérer tous les utilisateurs
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get(`http://localhost:8000/api/user/get`)
  return response.data
})

// Recupérer un utilisateur
export const fetchUserById = createAsyncThunk("user/fetchUserById", async (id) =>{
  const response = await axios.get(`http://localhost:8000/api/user/get/${id}`)
  return response.data
})

  // Mettre à jour l'utilisateur
  export const updateUser = createAsyncThunk("user/updateUser", async ({id, payload}) =>{
    const response = await axios.put(`http://localhost:8000/api/user/update-user/${id}`, payload)
    return response.data
  })

const initialUserState = {
  data: [],
  dataUserId: {},
  loading: null,
  error: false
}

export const User = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers:{
    UPDATE_USER: (state, actions) =>{
      state.dataUserId = actions.payload
    }
  },
  extraReducers: (builder) =>{
    // On passe par les extra reducers pour simplifier le code, pour gérer automatiquement les requête asynchrone en les écoutant
    builder
    // actions pour tous les utilisateurs
    .addCase(fetchUsers.pending, state =>{
      state.loading = true
      state.error = null
    })
    .addCase(fetchUsers.fulfilled, (state, actions) =>{
      state.loading = false
      state.data = actions.payload  
    })
    .addCase(fetchUsers.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.error.message
    })
    // actions pour 1 utilisateur
    .addCase(fetchUserById.pending, state =>{
      state.loading = true
      state.error = null
    })
    .addCase(fetchUserById.fulfilled, (state, actions)=>{
      state.dataUserId = actions.payload
      state.loading = false
    })
    .addCase(fetchUserById.rejected, (state, actions) =>{
      state.loading = false
      state.error = actions.error.message
    })
    // actions pour mise à jour d'1 utilisateur
    .addCase(updateUser.pending, state =>{
      state.loading = true
      state.error = null
    })
    .addCase(updateUser.fulfilled, (state, actions) =>{
      state.dataUserId = actions.payload
      state.loading = false
    })
    .addCase(updateUser.rejected, (state, actions) =>{
      state.loading = false
      state.error = actions.error.message
    })
  }
})

export const {UPDATE_USER} = User.actions

export default User.reducer