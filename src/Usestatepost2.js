import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usestatepost2 = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState(false);

    const allData = { name, email, password };

    const formSubmit = async (e) => {
        e.preventDefault();
        console.log(allData);

        if (!name || !email || !password) {
            setValidation('All fields are required.');
            return
        }

        setValidation(false);

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allData)
            });


            if (response.ok) {
                toast.success('User added successfully!');
                setName('');
                setEmail('');
                setPassword('');
            } else {
                toast.error('Failed to add user. Please try again.');
            }
        } catch (error) {
            toast.error('Something went wrong.');
            console.error(error);
        }
    }

    return (
        <div>
            <Header />
            <div className='container'>
                <h4 className='mt-3 mb-3'>Usestatepost2</h4>
                <div className='shadow p-3 mt-3 mb-3'>
                    <form onSubmit={formSubmit}>
                        <input type='text' placeholder='Enter name' className='form-control mb-2' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type='text' placeholder='Enter email' className='form-control mb-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' placeholder='Enter password' className='form-control mb-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {validation && <p className='text-danger'>{validation}</p>}
                        <input type='submit' className='btn btn-primary' />
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
            <Footer />
        </div>
    )
}

export default Usestatepost2;
