import React, { Component } from 'react';
import logo from './Favicon.png';
import './App.css';
import SMSForm from './SMSForm';

class App extends Component {
  // Dummy state data - replace with actual data fetching logic
  state = {
    users: [],
    organizations: {}, // e.g., { 'Org1': [{id: 1, name: 'User 1'}], 'Org2': [{id: 2, name: 'User 2'}] }
    conversations: []
  };

  handleOrgClick = (orgName) => {
    console.log('Organization clicked: ${orgName}');
    // Add logic for when an organization is clicked
  }

  handleConversationClick = (conversationId) => {
    console.log('Conversation clicked: ${conversationId}');
    // Add logic for when a conversation is clicked
  }

  render() {
    const { users, organizations, conversations } = this.state;

    return (
      <div className="app-container">
        <aside className="sidebar">
          <div className="user-count">
            Number of Users: {users.length}
          </div>
          <div className="organizations">
            <h3>View Organizations</h3>
            {Object.entries(organizations).map(([orgName, users]) => (
              <div key={orgName} onClick={() => this.handleOrgClick(orgName)} className="clickable">
                <h4>{orgName}</h4>
                <ul>
                  {users.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="conversations">
            <h3>Conversations</h3>
            <ul>
              {conversations.map(conv => (
                <li key={conv.id} onClick={() => this.handleConversationClick(conv.id)} className="clickable">
                </li>))}
            </ul>
          </div>
        </aside>
        <main className="main-content">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <SMSForm />
          </header>
        </main>
      </div>
    );
  }
}

export default App;
