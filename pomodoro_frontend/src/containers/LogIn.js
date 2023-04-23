import { useState, useContext, Image} from "react"
import AuthContext from "../context/AuthProvider";
import axios from "axios";

export const LogIn = (props) => {
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const state = {
        details: [],
        email: "",
        pass: "",
    };
  
    function componentDidMount() {
        let data;
  
        axios
            .get("http://localhost:8000/wel/")
            .then((res) => {
                data = res.data;
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
  
        axios
            .post("http://localhost:8000/wel/", {
                email: this.state.email,
                pass: this.state.pass,
            })
            .then((res) => {
                this.setState({
                    email: "",
                    pass: "",
                });
            })
            .catch((err) => {});
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
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**************" />
                <button>Log In</button>
            </form>
            <div className="switch-form">
                <p>Don't Have An Account?</p>
                <button onClick={() => props.onFormSwitch('register')}>Register</button>
            </div>
        </div>

    )
}