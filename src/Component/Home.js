import React, { useState } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import CSPHome from './CSPHome';
import image from '../Img/logo.png';

function Home() {
  const [formType, setFormType] = useState('login');

  const handleToggle = (type) => {
    setFormType(type);
    
  };

  const email = localStorage.getItem('email');
  const companyName = localStorage.getItem('companyName');

    

  return (
    <Router>
      <div>
        
        {formType === 'csphome' ? (
          <CSPHome handleToggle={handleToggle} email={email} companyName={companyName}/>
        ) : (
          <>
            <div className='menubar'><img src={image} alt='img'></img></div>
            <h2><center>To discover the perfect cloud solution tailored to your needs with our intuitive platform...</center></h2>
            <h1><center>Join us Today!</center></h1> 
            {formType === 'login' ? (
              <Login handleToggle={handleToggle} />
            ) : (
              <Signup handleToggle={handleToggle} />
            )}
          </>
        )}
      </div>
    </Router>
  );
}

export default Home;
