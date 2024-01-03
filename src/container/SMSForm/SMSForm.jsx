import React, { useState, useEffect } from 'react';
import './SMSForm.css';

const SMSForm = ({ to }) => {
  const [message, setMessage] = useState({ to: to || '', body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setMessage((prevState) => ({ ...prevState, to }));
  }, [to]);
  
  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    fetch('http://localhost:3001/api/messages', { // Adjust the URL accordingly
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setMessage({ to: '', body: '' });
        setError(false);
      } else {
        setError(true);
      }
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Error sending message:', error);
      setError(true);
      setSubmitting(false);
    });
  };
  

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setMessage((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className={error ? 'error sms-form' : 'sms-form'}
    >
      <div>
        <label htmlFor="to">To:</label>
        <textarea
          type="tel"
          name="to"
          id="to"
          value={message.to || ''}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <label htmlFor="body">Message:</label>
        <textarea
          name="body"
          id="body"
          value={message.body || ''}
          onChange={onHandleChange}
        />
      </div>
      <button type="submit" disabled={submitting}>
        Send message
      </button>
    </form>
  );
};

export default SMSForm;
