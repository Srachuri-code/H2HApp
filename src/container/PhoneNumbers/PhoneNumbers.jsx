import React, { useEffect, useState } from 'react';
import './PhoneNumbers.css';
import { db } from "../../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

const PhoneNumbers = ({ organization, onPhoneNumbersChange, onSelectPhoneNumber }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      if (!organization) return;
  
      try {
        const organizationsCollection = collection(db, 'input-group');
        const querySnapshot = await getDocs(query(organizationsCollection, where('organization', '==', organization)));
  
        const uniquePhoneNumbers = new Set();
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const organizationData = data.phone_number || [];
          if (Array.isArray(organizationData)) { // Check if it's an array
            organizationData.forEach((phoneNumber) => {
              uniquePhoneNumbers.add(phoneNumber);
            });
          } else {
            uniquePhoneNumbers.add(organizationData); // If it's not an array, treat it as a single number
          }
        });
  
        const uniquePhoneNumbersArray = Array.from(uniquePhoneNumbers);
        console.log('Unique phone numbers:', uniquePhoneNumbersArray); // Check fetched numbers
        setPhoneNumbers(uniquePhoneNumbersArray);
        onPhoneNumbersChange(uniquePhoneNumbersArray);
      } catch (error) {
        console.error('Error fetching phone numbers:', error);
      }
    };
  
    fetchPhoneNumbers();
  }, [organization, onPhoneNumbersChange]);
  
  const handlePhoneNumberClick = (phoneNumber) => {
    setSelectedPhoneNumber(phoneNumber);
    onSelectPhoneNumber(phoneNumber);
  };

  return (
    <div className="app__phone-numbers-container">
      {organization && <h2>Phone Numbers for {organization}:</h2>}
      <ul className="app__phone-numbers">
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index} 
            className={`app__phone-numbers-item ${selectedPhoneNumber === phoneNumber ? 'active' : ''}`}
            onClick={() => handlePhoneNumberClick(phoneNumber)}>
            {phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneNumbers;
