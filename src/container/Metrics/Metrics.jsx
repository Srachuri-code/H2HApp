import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Metrics = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const phoneNumbersCollection = collection(db, 'input-group'); 
        const querySnapshot = await getDocs(phoneNumbersCollection);
        
        const uniqueNumbers = new Set();
        querySnapshot.forEach((doc) => {
          const phoneNumber = doc.data().phone_number; 
          uniqueNumbers.add(phoneNumber);
        });

        setTotalUsers(uniqueNumbers.size); // Set the count of unique phone numbers
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="metrics">
      <h2>Total Users:</h2>
      <p>{totalUsers}</p>
    </div>
  );
};

export default Metrics;
