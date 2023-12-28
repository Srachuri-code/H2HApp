import React, { useEffect, useState } from 'react';
import './PhoneNumbers.css';

const predefinedPhoneNumbers = {
  'Organization A': ['123-456-7890', '987-654-3210'],
  'Organization B': ['555-555-5555'],
  'Organization C': ['999-999-9999'],
};

const PhoneNumbers = ({ organization, onPhoneNumbersChange }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    const fetchedNumbers = predefinedPhoneNumbers[organization] || [];
    setPhoneNumbers(fetchedNumbers);
    onPhoneNumbersChange(fetchedNumbers);
  }, [organization, onPhoneNumbersChange]);

  return (
    <div className="app__phone-numbers-container">
      {organization && <h2>Phone Numbers for {organization}:</h2>}
      <ul className="app__phone-numbers">
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index} className="app__phone-numbers-item">
            {phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneNumbers;