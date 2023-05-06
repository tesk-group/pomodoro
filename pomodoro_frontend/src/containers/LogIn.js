import { useState } from "react"
import { useStateContext } from '../context/ContextProvider';
import { Link } from "react-router-dom";

import axios from "../axios";

export const LogIn = (props) => {
  const { setToken, setUser } = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password};
    
    axios.post('/api/users/login', user)
      .then(response => response.data).then(data => {
        setToken(data.token);
        setUser(email);
        console.log(data.token);
      })
      .catch(function (error) {
        let response = error.response.data;
        let errorMessage = response.errors;
      
        if (typeof errorMessage !== 'string') {
          errorMessage = response.errors[Object.keys(response.errors)[0]];
        }
      
        alert(errorMessage);
      });
    
  } 
    
  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label class="in-form" for="email">Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email address" />
        <label class="in-form" for="password">Password</label>
        <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**************" />
        <button>Log In</button>
      </form>
      <div className="switch-form">
        <p>Don't Have An Account?</p>
        <Link to="/register">
          <button>
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}
