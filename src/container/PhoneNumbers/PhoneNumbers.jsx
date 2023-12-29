import React, { useEffect, useState } from 'react';
import './PhoneNumbers.css';
import { db } from "../../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

const PhoneNumbers = ({ organization, onPhoneNumbersChange }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      if (!organization) return;
  
      try {
        const organizationsCollection = collection(db, 'input-group');
        const querySnapshot = await getDocs(query(organizationsCollection, where('organization', '==', organization)));
  
        let fetchedPhoneNumbers = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const organizationData = data.phone_number || []; // Ensure phone_number is an array
          fetchedPhoneNumbers = fetchedPhoneNumbers.concat(organizationData); // Concatenate arrays
        });
  
        setPhoneNumbers(fetchedPhoneNumbers);
        onPhoneNumbersChange(fetchedPhoneNumbers);
      } catch (error) {
        console.error('Error fetching phone numbers:', error);
      }
    };
  
    fetchPhoneNumbers();
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
