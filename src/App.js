// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import { Organizations, PhoneNumbers, Metrics, SMSForm } from './container';
import { images } from './components';
import { auth, signInWithGoogle, signOut } from './firebase';

const allowedUsers = ["sujan.rachuri@gmail.com", "sujan.k.rachuri@vanderbilt.edu"]; // Add your allowed user's email

const App = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectPhoneNumber = (selectedNumbers) => {
    setSelectedPhoneNumbers(selectedNumbers);
  };

  const handleSignInClick = () => {
    if (!user) {
      signInWithGoogle();
    }
  };

  const handleSignOutClick = () => {
    signOut();
  };

  return (
    <div className='app'>
      <div className='header'>
        {user && allowedUsers.includes(user.email) && (
          <div className='user-welcome'>
            <p>Welcome, {user.displayName || user.email}!</p>
          </div>
        )}

        {user && allowedUsers.includes(user.email) && (
          <div className='sign-out-button'>
            <button onClick={handleSignOutClick}>Sign Out</button>
          </div>
        )}
      </div>

      {(user && allowedUsers.includes(user.email)) ? (
        <>
          <div className='metrics-container'>
            <Metrics />
          </div>
          <div className='selector-container'>
            <Organizations onSelectOrganization={setSelectedOrganization} />
            <PhoneNumbers
              organization={selectedOrganization}
              onPhoneNumbersChange={setPhoneNumbers}
              onSelectPhoneNumber={handleSelectPhoneNumber}
            />
          </div>
          <div className='messaging-container'>
            <SMSForm to={Array.isArray(selectedPhoneNumbers) ? selectedPhoneNumbers.join(', ') : ''} />
          </div>
        </>
      ) : (
        <div className='sign-in-container'>
          <h2>Heart2Heart Admin Sign In</h2>
          {!user || (user && allowedUsers.includes(user.email)) ? (
            <button onClick={handleSignInClick}>Sign in With Google</button>
          ) : (
            <p>This email is not approved.</p>
          )}
        </div>
      )}

      <div className='logos-container'>
        <img src={images.TheCHECLogo} alt="TheCHECLogo" className="app-logo" />
        <img src={images.HealthyHeartslogo} alt="HealthyHeartsLogo" className="app-logo" />
      </div>
    </div>
  );
};

export default App;
