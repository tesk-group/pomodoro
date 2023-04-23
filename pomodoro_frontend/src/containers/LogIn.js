import { useState } from "react"

export const LogIn = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label class="in-form" for  ="email">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email here" />
                <label class="in-form" for="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**************" />
                <button>Log In</button>
            </form>
            <p>Forgot Password?</p>
            <button>Reset Password</button>

            <p>Don't Have An Account?</p>
            <button onClick={() => props.onFormSwitch('register')}>Register</button>
        </div>

    )
}