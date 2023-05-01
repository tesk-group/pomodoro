import { useState } from "react"

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [password_confirmation, setConfirm] = useState('');
    const [username, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { email, username, password, password_confirmation};

        console.log(fetch('/api/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(newUser)
        }).then(() => {
            console.log('New User Registered')
        }));
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
                <button onClick={() => props.onFormSwitch('login')}>Log In </button>
            </div>
        </div>

    )
}