import { useState, useContext, Image} from "react"
import AuthContext from "../context/AuthProvider";
import axios from "axios";

export const LogIn = (props) => {
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [token, setToken] = useState('');

    const state = {
        details: [],
        email: "",
        password: "",
        token: "",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password};

        console.log(fetch('/api/users/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(user)
        }).then(() => {
            console.log('New User Registered')
        })); 
    };

    const handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    

    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label class="in-form" for="email">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email address" />
                <label class="in-form" for="password">Password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**************" />
                <button>Log In</button>
                <p> TESTING HOST CHANGES</p>
            </form>
            <div className="switch-form">
                <p>Don't Have An Account?</p>
                <button onClick={() => props.onFormSwitch('register')}>Register</button>
            </div>
        </div>

    )
}