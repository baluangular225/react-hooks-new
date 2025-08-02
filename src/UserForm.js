// src/UserForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIncrement, setMessage } from './Redux/userSlice';

const UserForm = () => {
    
  const [message, setMessageState] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleUser = () =>{
     dispatch(addIncrement())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setMessage(message));
    setSubmitted(true);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessageState(e.target.value)}
            placeholder="Enter your message"
            required
          />
          <button type="submit" onClick={handleUser}>Submit</button>
        </form>
        {submitted}
    </div>
  );
};

export default UserForm;
