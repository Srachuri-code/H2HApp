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
      <Organizations onSelectOrganization={setSelectedOrganization} />
      <PhoneNumbers 
        organization={selectedOrganization} 
        onPhoneNumbersChange={setPhoneNumbers}
        onSelectPhoneNumber={setSelectedPhoneNumber} 
      />
      <Metrics />
      <SMSForm to={selectedPhoneNumber} />
    </div>
  );
};

export default App;