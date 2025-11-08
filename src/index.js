// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserContextProvider } from './Usecontext/userContext';
import { UserContextProvider1 } from './Usecontext/userContext1';
import { UserContextProvider2 } from './Usecontext/userContext2';
import { UserContextProvider4 } from './Usecontext/userContext3';
import { UserContextProvider5 } from './Usecontext/userContext4';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <UserContextProvider5>
   <UserContextProvider4>
    <UserContextProvider2>
      <UserContextProvider1>
        <UserContextProvider>
           <Provider store={store}>
            <App />
          </Provider>
        </UserContextProvider>
      </UserContextProvider1>
      </UserContextProvider2>
      </UserContextProvider4>
      </UserContextProvider5>
   </React.StrictMode> 
);

reportWebVitals();
