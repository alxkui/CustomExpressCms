import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Login() {

    const [user, setUser] = useState({
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

    const handleLogin = (e) => {
        e.preventDefault();

        // Login with api request
        axios.post('auth/login', user)
            .then(res => {
                console.log(res);
                const token = res.data.token
                localStorage.setItem('token', token);
            }).catch(err => {
                console.log(err);
            });

        console.log("Attempted login...");
    }

    return(
        <div className="App">
        <h1>Login</h1>
        <hr />
        <form>
          <input type="email" placeholder="Email" onChange={handleChange} name="email"></input>
          <input type="password" placeholder="Password" onChange={handleChange} name="password"></input>
          <button type="submit" onClick={handleLogin}>Log In</button>
        </form>
      </div>
    );
}

export default Login;