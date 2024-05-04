import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ handleToggle }) => {
  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '' 
  });

  const [message, setMessage] = useState('');

  // Effect to check session on component mount
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    const userEmail = localStorage.getItem('email');
    const userCompanyName = localStorage.getItem('companyName');
    if (sessionToken && userEmail && userCompanyName) {
      handleToggle('csphome');
    }
  }, [handleToggle]);

  //Handling Login changes
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/csp/api/users.php', {
        login: true, 
        ...loginData, 
      });

      if (response.data.success) {
        setMessage(response.data.success);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('companyName', response.data.companyName);
        localStorage.setItem('sessionToken', response.data.sessionToken);
        setTimeout(() => {
          handleToggle('csphome'); 
        }, 1500);
      } else {
        setMessage('Login failed. Please try again.'); 
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while logging in.'); 
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <h3>{message}</h3>
        <div className='text'>Login</div>
      </div>
      <div className='inputs'>
        <form onSubmit={handleSubmit}>
          <div className='input'> 
            <input type='email' name='email' placeholder='Email' value={loginData.email} onChange={handleLoginChange} required/> 
          </div>
          <div className='input'>
            <input type="password" name='password' placeholder="Password" value={loginData.password} onChange={handleLoginChange} required/>
          </div>
        
          <div className='submit-container'>
            <div><button className='submit' type="submit">Login</button></div> 
            <br />
        
            <div>
              <div>Don't have an account? <button className='submit-gray' onClick={() => handleToggle('signup')}>Signup</button></div>
            </div>
          </div>
        </form>
      </div>  
    </div>
  );
};

export default Login;
