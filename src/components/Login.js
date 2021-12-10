import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credintials, setCredintials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credintials.email, password: credintials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('../', { replace: true });
        } else {
            alert('Invalid credintials');
            setCredintials({email: "", password: ""});
        }
    };

    const onChange = (e) => {
        // setting the target's names to the value being typed in realtime
        setCredintials({ ...credintials, [e.target.name]: e.target.value });
    };

    return(
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credintials.email} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credintials.password} />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
          </form>
        </>
    );
};

export default Login;
