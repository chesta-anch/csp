import React, { useState } from 'react';
import axios from 'axios';

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            companyName: formData.get('company_name'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        try {
            let res;
            if (action === "Sign Up") {
                res = await axios.post('http://localhost:5000/api/signup', userData);
            } else {
                res = await axios.post('http://localhost:5000/api/login', userData);
            }
            console.log(res.data); // Handle success response
        } catch (err) {
            console.error(err); // Handle error
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <form className='inputs' onSubmit={handleFormSubmit}>
                {action === "Login" ? null : (
                    <div className='input'>
                        <img src='' alt='' />
                        <input type='name' placeholder='Company Name' id='company_name' name='company_name' required /> <br />
                    </div>
                )}
                <div className='input'>
                    <img src='' alt='' />
                    <input type='email' placeholder='Email' id='email' name='email' required />
                </div>
                <div className='input'>
                    <img src='' alt='' />
                    <input type='password' placeholder='password' id='password' name='password' required /> <br />
                </div>
                <div className='submit-container'>
                    <div className={action === "Login" ? "submit-gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Signup</div>
                    <div className={action === "Sign Up" ? "submit-gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
                </div>
            </form>
        </div>
    );
};

export default LoginSignup;
