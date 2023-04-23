import { useState } from "react"

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setConfirm] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label for="name">First Name</label>
                <input value={name} id="name" onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter your first name" />
                <label class="in-form" for="email">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email here" />
                <label class="in-form" for="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**************" />
                <label class="in-form" for="password">Confirm Password</label>
                <input value={pass} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="**************" />
                <p></p>
                <button type="submit">Finish Registration</button>
            </form> 
            <p>Already Have An Account?</p>
            <button onClick={() => props.onFormSwitch('login')}>Log In </button>
        </div>

    )
}