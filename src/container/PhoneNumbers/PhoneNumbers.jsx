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
    <div className="phone-numbers-container">
      {organization && <h2>Phone Numbers for {organization}</h2>}
      <ul className="phone-numbers-list">
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index} className="app__organization-item">
            {phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneNumbers;


/*
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import './PhoneNumbers.css';

const predefinedPhoneNumbers = {
  'Organization A': ['123-456-7890', '987-654-3210'],
  'Organization B': ['555-555-5555'],
  'Organization C': ['999-999-9999'],
};

const PhoneNumbers = ({ organization }) => {
  // const [phoneNumbers, setPhoneNumbers] = useState([]);
  const phoneNumbers = predefinedPhoneNumbers[organization] || [];

  // useEffect(() => {
  //   const fetchPhoneNumbers = async () => {
  //     try {
  //       const phoneNumbersCollection = db.collection('input-group');
  //       const query = phoneNumbersCollection.where('organization', '==', organization); // Filter by organization
  //       const snapshot = await query.get();
  //       const phoneNumbersData = snapshot.docs.map((doc) => doc.data().phone_number);
  //       setPhoneNumbers(phoneNumbersData);
  //     } catch (error) {
  //       console.error('Error fetching phone numbers:', error);
  //     }
  //   };

  //   if (organization) {
  //     fetchPhoneNumbers();
  //   }
  // }, [organization]);

  return (
    <div className="phone-numbers-container">
      {organization && <h2>Phone Numbers for {organization}</h2>}
      <ul className="phone-numbers-list">
        {phoneNumbers.map((phoneNumber, index) => (
          <li 
            key={index}
            className="app__organization-item"
            // onClick={() => onPhoneNumberClick(phoneNumber)}
          >
            {phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneNumbers;
*/