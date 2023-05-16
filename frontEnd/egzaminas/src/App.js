import React, {useState} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './App.css';
import {Route, Routes, Link} from 'react-router-dom';
import Form from './components/Form/Form';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Home from './components/Home/Home';
import NewClient from './components/NewClient/NewClient';
import CreatedClients from './components/CreatedClients/CreatedClients';

function App() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');

  
  const [token, setToken] = useState('');

  
  async function handleRegistration(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/register', {userName, password});
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {userName, password});
      console.log(response.data);
      setToken(response.data.token);
      localStorage.setItem('jwtToken', response.data.token);
      console.log(jwtDecode(response.data.token));
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createNewClient(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/newClient', {name, surname, email, phone});
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteCreatedClient(e) {
    e.preventDefault();
    try {
      const reponse = await axios.delete('http://localhost:4000/client/:id', {_id: id});
      console.log(reponse.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  
  function isLoggedIn() {
    const jwtToken = localStorage.getItem('jwtToken');

    if(!jwtToken) {
      return false;
    }

    const decodedToken = jwtDecode(jwtToken);
    console.log(decodedToken);
    return decodedToken.exp > Date.now() / 1000;
  }

  return (
    <div>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/register'}>Registration</Link></li>
      </ul>
      <Routes>
        
        <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}>
          <Route path='new-client' element={<NewClient name={name} setName={setName} surname={surname} setSurname={setSurname} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} action={createNewClient}/>}/>
          <Route path='created-clients' element={<CreatedClients id={id} setId={setId} action={deleteCreatedClient}/>}/>
        </Route>

        <Route/>
        <Route path='/login' element={<Form userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} action={handleLogin}/>}/>
        <Route path='/register' element={<RegisterForm userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} action={handleRegistration}/>}/>
      </Routes>
    </div>
  );
}

export default App;
