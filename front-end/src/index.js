import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import axios from "axios"

// Style
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'


//Router
import {BrowserRouter} from 'react-router-dom'

// Context
import { AuthProvider } from './context/AuthContext';

// Redux
import store from './redux/store';
// Provider pour envelopper l'App
import {Provider} from 'react-redux'

/* Pour que l'outil soit correctement géré par les requetes axios, il faut ajouter l'option withCredentials. On ne peut pas le faire avec fetch*/
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
