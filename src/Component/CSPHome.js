import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';
import SuggestedServers from './SuggestedServers';
import MenuBar from './MenuBar';

function CSPHome({ email, companyName }) {
  const [pageType, setPageType] = useState('welcome'); // Default pageType to 'welcome'
  const [topThreeServers, setTopThreeServers] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch email from local storage
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      // Extract username from email
      const extractedName = userEmail.split('@')[0];
      setUserName(extractedName);
    }
  }, []); // Run this effect only once on component mount

  const handleFormSubmit = (type, data) => {
    setPageType(type);
    if (type === 'suggestedservers') {
      setTopThreeServers(data);
      console.log(data);
    }
  }

  return (
    <div>
      <MenuBar />
      {pageType === 'suggestedservers' ? (
        <SuggestedServers topThreeServers={topThreeServers} />
      ) : pageType === 'userinput' ? (
        <UserInput handleFormSubmit={handleFormSubmit} />
      ) : (
        <div>
          <h1>Welcome to Cloud Server Selection Platform, {userName || 'Guest'}</h1>
          <p>Explore the best cloud servers tailored to your needs.</p>
          <p>Welcome to our Cloud Server Selection Platform, where we bring the power of tailored cloud solutions right to your fingertips! 
            Whether you're a seasoned tech aficionado or just starting your cloud journey, our platform is designed to simplify the complex world of cloud computing. 
            By providing us with a few details about your company, we'll match you with the perfect cloud service providers tailored to your unique needs. 
            Say goodbye to guesswork and hello to precision – let's embark on this cloud adventure together!</p>
          {/* Add any other welcome content here */}
          <button onClick={() => setPageType('userinput')}>Get Started</button>
        </div>
      )}
    </div>
  );
}

export default CSPHome;
