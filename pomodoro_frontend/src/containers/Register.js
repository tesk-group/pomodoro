import { useState } from "react"
import { Link } from "react-router-dom";
import { useStateContext } from '../context/ContextProvider';

export const Register = (props) => {

    const { setToken, setUser } = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [password_confirmation, setConfirm] = useState('');
    const [username, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {username, email, password, password_confirmation};

        try { fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'X-CSRF-TOKEN': "{{ csrf_token() }}"},
            body: JSON.stringify(newUser)
        }).then(response => response.json()).then(data => {
            setToken(data.token);
            setUser(data.email);
            console.log(data);
        })}
        catch(error) {
            console.log(error);
        }
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