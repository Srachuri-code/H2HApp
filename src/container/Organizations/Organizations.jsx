import React, { useState, useEffect } from 'react';
import './Organizations.css';
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp, getDocs, query, where } from 'firebase/firestore';


const predefinedOrganizations = ['Organization A', 'Organization B', 'Organization C'];

const Organizations = ({ onSelectOrganization }) => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleClick = (organization) => {
    setSelectedOrganization(organization);
    onSelectOrganization(organization);
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const organizationsCollection = collection(db, 'input-group');
        const snapshot = await getDocs(organizationsCollection);
        const organizationsList = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const organizationsData = data.organization;
          organizationsList.push(organizationsData);
        });
        setOrganizations(organizationsList);
      } catch (error) {
        console.error('error fetching organizations:', error);
      }
    };
    fetchOrganizations(); 
  }, []); 

  return (
    <div className="app__organizations-container">
      <h2>Choose an organization:</h2>
      <ul className="app__organizations">
        {organizations.map((organization) => (
          <li
            className={`app__organization-item ${selectedOrganization === organization ? 'active' : ''}`}
            key={organization}
            onClick={() => handleClick(organization)}
          >
            {organization}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;