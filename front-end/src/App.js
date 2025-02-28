import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/home';
import { ArticlesView } from './pages/articlesView';
import { Details } from './pages/details';
import { DashboardHome } from './pages/dashboard/dashboardHome';
import { IndexCoffee } from './pages/dashboard/indexCoffee';
import { AddCofee } from './pages/dashboard/addCofee';
import { UpdateCoffee } from './pages/dashboard/updateCoffee';
import { UserList } from './pages/dashboard/userList';
import { SignUp } from './pages/auth/signUp';
import { Nothing } from './pages/nothing';
import { Cart } from './pages/cart/cart';
import Login from './pages/auth/login';
import Layout from './components/layout';
import ProtectedRoute from './components/protectedRoute';
import { UserUpdate } from './pages/dashboard/userUpdate';
import { AboutUs } from './pages/aboutUs';
import { Contact } from './pages/contact';
import { Account } from './pages/account';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
        <Route index element={<Home/>} />
        <Route path='/articlesview' element={<ArticlesView/>} />
        <Route path='/detail/:id' element={<Details/>} />
        <Route path='*' element={<Nothing/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/quisommesnous' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/profile' element={<Account/>} />
        
        <Route element={<ProtectedRoute/>}>
          <Route path='/dashboard' element={<DashboardHome/>}/>
          <Route path='/dashboard/index' element={<IndexCoffee/>}/>
          <Route path='/dashboard/addcoffee' element={<AddCofee/>}/>
          <Route path='/dashboard/updatecoffee/:id' element={<UpdateCoffee/>}/>
          <Route path='/dashboard/userslist' element={<UserList/>}/>
          <Route path='/dashboard/userupdate/:id' element={<UserUpdate/>}/>
        </Route>

      </Route>
      
    </Routes>
  );
}

export default App;
