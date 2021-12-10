import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credintials, setCredintials] = useState({name:"" ,email: "", password: "", confirmPassword: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credintials;
        // Calling the API
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        // handling the API response
        if (json.success) {
            // save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('../', { replace: true });
        } else {
            alert('user already exists');
        }
    };

    const onChange = (e) => {
        // setting the target's names to the value being typed in realtime
        setCredintials({ ...credintials, [e.target.name]: e.target.value });
    };

    return(
        <>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" onChange={onChange} name="name"/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="confirmPassword" className="form-control" id="confirmPassword" onChange={onChange} name="confirmPassword" minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
          </form>
        </>
    );
};

export default Signup;
