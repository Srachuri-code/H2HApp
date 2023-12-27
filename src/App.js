// import logo from './Favicon.png';

import React from 'react'
import './App.css';
import { Organizations, PhoneNumbers, Metrics, SMSForm }from './container';

const App = () => {
  return (
    <div className='app'>
      <Organizations />
      <PhoneNumbers />
      <Metrics/>
      <SMSForm />
    </div>
  )
}

export default App