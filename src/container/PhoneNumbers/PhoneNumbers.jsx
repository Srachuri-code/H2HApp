import React, { useEffect, useState } from 'react';
import './PhoneNumbers.css';
import { db } from '../../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const PhoneNumbers = ({ organization, onPhoneNumbersChange, onSelectPhoneNumber }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      if (!organization) return;

      try {
        const organizationsCollection = collection(db, 'input-group');
        const querySnapshot = await getDocs(
          query(
            organizationsCollection,
            where('organization', '==', organization),
            orderBy('timestamp', 'desc') // Order by timestamp in descending order
          )
        );

        const uniquePhoneNumbers = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const organizationData = data.phone_number || [];
          if (Array.isArray(organizationData)) {
            organizationData.forEach((phoneNumber) => {
              uniquePhoneNumbers.add(phoneNumber);
            });
          } else {
            uniquePhoneNumbers.add(organizationData);
          }
        });

        const uniquePhoneNumbersArray = Array.from(uniquePhoneNumbers);
        setPhoneNumbers(uniquePhoneNumbersArray);
        onPhoneNumbersChange(uniquePhoneNumbersArray);
      } catch (error) {
        console.error('Error fetching phone numbers:', error);
      }
    };

    fetchPhoneNumbers();
  }, [organization, onPhoneNumbersChange]);

  const handlePhoneNumberClick = (phoneNumber) => {
    const updatedPhoneNumbers = selectedPhoneNumbers.includes(phoneNumber)
      ? selectedPhoneNumbers.filter((num) => num !== phoneNumber)
      : [...selectedPhoneNumbers, phoneNumber];

    setSelectedPhoneNumbers(updatedPhoneNumbers);
    onSelectPhoneNumber(updatedPhoneNumbers);
  };

  return (
    <div className="app__phone-numbers-container">
      {organization && <h2>Phone Numbers for {organization}:</h2>}
      <ul className="app__phone-numbers">
        {phoneNumbers.map((phoneNumber, index) => (
          <li
            key={index}
            className={`app__phone-numbers-item ${
              selectedPhoneNumbers.includes(phoneNumber) ? 'active' : ''
            }`}
            onClick={() => handlePhoneNumberClick(phoneNumber)}
          >
            {phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneNumbers;
