import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items : JSON.parse(localStorage.getItem('cart'))
}