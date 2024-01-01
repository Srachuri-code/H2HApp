// import logo from './Favicon.png';

import React, { useState } from 'react';
import './App.css';
import { Organizations, PhoneNumbers, Metrics, SMSForm } from './container';

const App = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');

  return (
    <div className='app'>
      <div className='metrics-container'>
        <div className='metrics-placeholder'>Metrics Coming Soon!</div>
        {/* We'll replace this with <Metrics /> when ready */}
      </div>
      <div className='selector-container'>
        <Organizations onSelectOrganization={setSelectedOrganization} />
        <PhoneNumbers 
          organization={selectedOrganization} 
          onPhoneNumbersChange={setPhoneNumbers}
          onSelectPhoneNumber={setSelectedPhoneNumber} 
        />
      </div>
      <div className='messaging-container'>
        <SMSForm to={selectedPhoneNumber} />
      </div>
    </div>
  );
};

export default App;