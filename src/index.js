// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from './Usecontext/userContext';
import { UserContextProvider1 } from './Usecontext/userContext1';
import { UserContextProvider2 } from './Usecontext/userContext2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <UserContextProvider2>
      <UserContextProvider1>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </UserContextProvider1>
      </UserContextProvider2>
   </React.StrictMode> 
);

reportWebVitals();
