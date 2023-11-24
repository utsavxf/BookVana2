
import './App.css';

import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import NewPost from './components/NewPost/NewPost';
import Register from './components/Register/Register';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserProfile from './components/UserProfile/UserProfile';

function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[])

  const {isAuthenticated}=useSelector((state)=>state.user)


  return (
    <Router>
      {
        isAuthenticated &&  <Header/>
      }
     

      <Routes>
      <Route path="/" element={isAuthenticated? <Home/>  :<Login />} />
      <Route path="/login" element={isAuthenticated? <Home/>  :<Login />} />
      <Route path="/account" element={isAuthenticated? <Account/>  :<Login />} />
      <Route path="/newpost" element={isAuthenticated? <NewPost/>  :<Login />} />
      <Route path="/register" element={isAuthenticated? <Account/>  :<Register />} />
      <Route path="/update/profile" element={isAuthenticated? <UpdateProfile/>  :<Register />} />
      <Route path="/update/password" element={isAuthenticated? <UpdatePassword/>  :<Register />} />
      <Route path="/forgot/password" element={isAuthenticated? <UpdatePassword/>  :<ForgotPassword />} />
      <Route path="/password/reset/:token" element={isAuthenticated? <UpdatePassword/>  :<ResetPassword />} />
      <Route path="/user/:id" element={isAuthenticated? <UserProfile/>  :<Login />} />
      </Routes>

    </Router>

  );
}

export default App;
