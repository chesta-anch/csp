import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Signup({ handleToggle }) {
  const [signupData, setSignupData] = useState({ 
    companyName: '', 
    email: '', 
    password: '', 
    confirm_password: '' 
});
  const [message, setMessage] = useState('');

  // Effect to check session on component mount
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      handleToggle('csphome');
    }
  }, [handleToggle]);

  //Handling Signup Changes
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupData);
    try {
        const response = await axios.post('http://localhost/csp/api/users.php', {
          signup: true, 
          ...signupData, 
        });
    
        if (response.data.success) {
          setMessage(response.data.success);
          localStorage.setItem('sessionToken', response.data.sessionToken);
          localStorage.setItem('email', signupData.email);
          localStorage.setItem('companyName', signupData.companyName);
          setTimeout(() => {
            handleToggle('csphome');
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
  };
  
  return (
    <div className='container'>
        <div className='header'>
            <h3>{message}</h3>
            <div className='text'>Signup</div>
        </div>

        <div className='inputs'>
            <form onSubmit={handleSubmit}>
            <div className='input'>
                <input type='text' placeholder='Company Name' name='companyName' value={signupData.companyName} onChange={handleSignupChange} required/> <br />
            </div>
            <div className='input'>
                <input type='email' placeholder='Email' name='email' value={signupData.email} onChange={handleSignupChange} required/> <br />
            </div>
            <div className='input'>
                <input type="password" placeholder="Password" name='password' value={signupData.password} onChange={handleSignupChange} required/> <br />
            </div>
            <div className='input'>
                <input type="password" placeholder="Confirm Password" name='confirm_password' value={signupData.confirm_password} onChange={handleSignupChange} required/> <br />
            </div>
            <div className='submit-container'>
                <button className='submit' type='submit'>Signup</button>
                <br />
        
                <div>Already have an account? <button className='submit-gray' onClick={() => handleToggle('login')}>Login</button></div>
            </div>
            </form>  
            
        </div>
      
    </div>
  );
}

export default Signup;
