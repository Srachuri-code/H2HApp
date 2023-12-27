import React, { useEffect, useState } from 'react';
import { PhoneNumbers } from '..';
import { db } from '../../firebase';
import './Organizations.css';

const predefinedOrganizations = ['Organization A', 'Organization B', 'Organization C'];

const Organizations = () => {
  // const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  // useEffect(() => {
  //   const fetchOrganizations = async () => {
  //     try {
  //       const organizationsCollection = db.collection('input-group');
  //       const snapshot = await organizationsCollection.get();
  //       const organizationsData = snapshot.docs.map((doc) => doc.data().organization);
  //       setOrganizations(organizationsData);
  //     } catch (error) {
  //       console.error('Error fetching organizations:', error);
  //     }
  //   };

  //   fetchOrganizations();
  // }, []);

  const handleClick = (organization) => {
    setSelectedOrganization(organization);
  };

  return (
    <div className="app__organizations-container">
      <ul className="app__organizations">
        {predefinedOrganizations.map((organization) => (
        // organizations.map((organization) => (
          <li
            className={`app__organization-item ${selectedOrganization === organization ? 'active' : ''}`}
            key={organization}
            onClick={() => handleClick(organization)}
          >
            {organization}
          </li>
        ))}
      </ul>
      {selectedOrganization && <PhoneNumbers organization={selectedOrganization} />}
    </div>
  );
};

export default Organizations;
