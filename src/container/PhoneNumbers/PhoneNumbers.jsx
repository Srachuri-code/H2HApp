import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import './PhoneNumbers.css';

const PhoneNumbers = ({ organization }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const phoneNumbersCollection = db.collection('input-group');
        const query = phoneNumbersCollection.where('organization', '==', organization); // Filter by organization
        const snapshot = await query.get();
        const phoneNumbersData = snapshot.docs.map((doc) => doc.data().phone_number);
        setPhoneNumbers(phoneNumbersData);
      } catch (error) {
        console.error('Error fetching phone numbers:', error);
      }
    };

    if (organization) {
      fetchPhoneNumbers();
    }
  }, [organization]); // Add organization to the dependency array

  return (
    <div className="phone-numbers-container">
      <h2>Phone Numbers for {organization}</h2>
      <ul className="phone-numbers-list">
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index}>{phoneNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneNumbers;
