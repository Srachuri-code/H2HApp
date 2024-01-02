import React, { useState } from 'react';
import './App.css';
import { Organizations, PhoneNumbers, Metrics, SMSForm } from './container';
import { images } from './components';

const App = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);

  const handleSelectPhoneNumber = (selectedNumbers) => {
    setSelectedPhoneNumbers(selectedNumbers);
  };

  return (
    <div className='app'>
      <div className='metrics-container'>
        <div className='metrics-placeholder'><h2>Metrics Coming Soon!</h2></div>
        {/* We'll replace this with <Metrics /> when ready */}
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

      <div className='logos-container'>
        <img src={images.TheCHECLogo} alt="TheCHECLogo" className="app-logo" />
        <img src={images.HealthyHeartslogo} alt="HealthyHeartsLogo" className="app-logo" />
      </div>
    </div>
  );
};

export default App;
