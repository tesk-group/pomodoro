import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from '../context/ContextProvider';

import axios from "../axios";

export const Register = (props) => {

  const { setToken, setUser } = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [password_confirmation, setConfirm] = useState('');
  const [username, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {username, email, password, password_confirmation};
    
    axios.post('/api/users/', newUser)
      .then(response => response.data).then(data => {
        console.log("happy happy happy");
        alert("Account registered");
        return navigate('/login');
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
      <form className="register-form" onSubmit={handleSubmit}>
        <label for="username">First Name</label>
        <input value={username} id="username" onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter your first name" />
        <label class="in-form" for="email">Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email address" />
        <label class="in-form" for="password">Password</label>
        <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**************" />
        <label class="in-form" for="password_confirmation">Confirm Password</label>
        <input value={password_confirmation} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="**************" />
        <button type="submit">Register New Account</button>
      </form> 
      <div className="switch-form">
        <p>Already Have An Account?</p>
        <Link to="/login">
          <button>
            Log In
          </button>
        </Link>
      </div>
    </div>
  )
}
