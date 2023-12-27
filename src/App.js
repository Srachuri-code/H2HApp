// import logo from './Favicon.png';

import React, { useState } from 'react';
import './App.css';
import { Organizations, PhoneNumbers, Metrics, SMSForm } from './container';

const App = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  return (
    <div className='app'>
      <Organizations onSelectOrganization={setSelectedOrganization} />
      <PhoneNumbers organization={selectedOrganization} onPhoneNumbersChange={setPhoneNumbers} />
      <Metrics />
      <SMSForm phoneNumbers={phoneNumbers} />
    </div>
  );
};

export default App;