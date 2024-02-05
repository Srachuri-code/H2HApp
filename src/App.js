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
  const [emailApproved, setEmailApproved] = useState(true); // State to track if email is approved

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      // Check if the user's email is approved
      if (user && !allowedUsers.includes(user.email)) {
        setEmailApproved(false);
      } else {
        setEmailApproved(true);
      }
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

  const handleTryAgainClick = () => {
    // Reset the email approval state
    setEmailApproved(true);
    // Sign out to go back to the sign-in page
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

      {emailApproved ? (
        // If email is approved, show the dashboard components
        (user && allowedUsers.includes(user.email)) ? (
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
          // If the user is not signed in, show the sign-in button
          <div className='sign-in-container'>
            <h2>Heart2Heart Admin Dashboard</h2>
            {!user || (user && allowedUsers.includes(user.email)) ? (
              <button onClick={handleSignInClick}>Sign in With Google</button>
            ) : (
              <p>This email is not approved to view the dashboard.</p>
            )}
          </div>
        )
      ) : (
        // If email is not approved, show the try again message
        <div className='sign-in-container'>
          <h2>Heart2Heart Admin Dashboard</h2>
          <p>This email is not approved to view the dashboard. Please try again.</p>
          <button onClick={handleTryAgainClick}>Try Again</button>
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
