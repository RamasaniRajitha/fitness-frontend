import './App.css';

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Page404 from './pages/Page404';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ForgotPwd from './pages/ForgotPwd';
import Resend from './pages/Resend';

function App() {
  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  }  

  return (
    <>
      <HashRouter>
        <Navbar />  
        <Routes>
          <Route path="/" element={
            <Landing />
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path='/signup' element={
            <Signup />
          } />
          <Route path='/reset' element={
            <ForgotPwd />
          } />
          <Route path='/resend' element={
            <Resend />
          } />
          <Route path='/profile' element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
          <Route path='/home' element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          <Route path="/*" element={
            <Page404 />
          } />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;