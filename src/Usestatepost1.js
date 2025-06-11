import React, { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Usestatepost1 = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   console.log({name, email, password});

const userData = {name, email, password}

const formSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch(`http://localhost:3001/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (response.ok) {
    toast.success('User added successfully!');
    setName('');
    setEmail('');
    setPassword('');
  } else {
    toast.error('Failed to add user. Please try again.');
  }
};


    return (
        <div>
            <Header/>
               <div className="container">
                   <h4>Usestatepost1 Component</h4>

                  <div className="shadow p-3">
                   <form onSubmit={formSubmit}>
                      <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} />
                      <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button type="submit" className="btn btn-primary">Submit</button>
                   </form>
                   </div>

               </div>
               <ToastContainer position="top-right" autoClose={3000} />
            <Footer/>
        </div>
    )
};  

export default Usestatepost1;