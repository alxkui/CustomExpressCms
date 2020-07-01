import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../App.css';


function Register() {

  const [user, setUser] = useState({
    username: null,
    password: null,
    email: null
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUser({
      ...user,
      [name]: value
    });

  }

  const handleRegister = (e) => {
    e.preventDefault();

    // Send request to API
    axios.post('auth/register', user)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

    console.log("test!");
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <hr />
      <form>
        <input type="text" placeholder="Username" onChange={handleChange} name="username"></input>
        <input type="email" placeholder="Email" onChange={handleChange} name="email"></input>
        <input type="password" placeholder="Password" onChange={handleChange} name="password"></input>
        <button type="submit" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default Register;
