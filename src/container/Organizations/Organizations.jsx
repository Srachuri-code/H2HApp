import React, { useState } from 'react';
import './Organizations.css';

const predefinedOrganizations = ['Organization A', 'Organization B', 'Organization C'];

const Organizations = ({ onSelectOrganization }) => {
  const [selectedOrganization, setSelectedOrganization] = useState('');

  const handleClick = (organization) => {
    setSelectedOrganization(organization);
    onSelectOrganization(organization);
  };

  return (
    <div className="app__organizations-container">
      <h2>Choose an organization:</h2>
      <ul className="app__organizations">
        {predefinedOrganizations.map((organization) => (
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