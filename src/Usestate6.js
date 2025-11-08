import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usestate6 = () =>{

    const URL="https://jsonplaceholder.typicode.com/users";

    const [EmployeeData, setEmployeeData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    const navigation = useNavigate();

    // Navigate to post page after running any pre-navigation logic
    const handlePost = () => {
        // place any logic you need to run before navigation here
        // e.g. set some state, analytics, validation, etc.
        navigation('/Usepost6');
    }

    const validateForm = () => {
        const newErrors = {};

        // Name required
        if (!name || !String(name).trim()) {
            newErrors.name = 'Name is required';
        }

        // Email required + simple format check
        const emailVal = String(email || '').trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(emailVal)) {
            newErrors.email = 'Enter a valid email address';
        }

        // Phone required + digits length
        const phoneVal = String(phone || '').trim();
        const phoneDigits = phoneVal.replace(/\D/g, '');
        if (!phoneDigits) {
            newErrors.phone = 'Phone is required';
        } else if (phoneDigits.length < 7) {
            newErrors.phone = 'Phone number is too short';
        }

        // Website optional but if provided must be a valid URL or a domain (e.g. example.com or www.example.com)
        const websiteVal = String(website || '').trim();
        if (websiteVal) {
            // Try URL constructor first (accepts full URLs). If that throws, accept common domain formats.
            const maybeUrl = websiteVal.startsWith('http') ? websiteVal : `https://${websiteVal}`;
            try {
                // eslint-disable-next-line no-new
                new URL(maybeUrl);
            } catch (e) {
                // Accept domain-like strings such as 'example.com' or 'www.example.com' optionally with a path
                const domainRegex = /^[a-z0-9\-\.]+\.[a-z]{2,}(\/.*)?$/i;
                if (!domainRegex.test(websiteVal)) {
                    newErrors.website = 'Website URL is invalid';
                }
            }
        }

        setErrors(newErrors);
        const valid = Object.keys(newErrors).length === 0;
        return { valid, newErrors };
    }

    const fetchApi = async (apiUrl) =>{
        setLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setEmployeeData(data);
            setLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('API 404 Error');
            }
        } catch (error) {
            setIsError({status:true, msg:error.message});
            setLoading(false);
            setIsError({status:true, msg:error.message || 'something went wrong'});
        }
    }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method:'DELETE',
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Employee Delete Failed');
            }
            setEmployeeData(EmployeeData.filter(eachEmployee=> eachEmployee.id !== id))
            // show success toast on delete
            toast.success('Employee deleted successfully');
        } catch (error) {
            setIsError({status:true, msg:error.message || 'something went wrong'});
            toast.error(error.message || 'Failed to delete employee');
        }
    }

    const handleEdit = async (id, name, email, phone, website) =>{
        setEditId(id);
        setName(name);
        setEmail(email);
        setPhone(phone);
        setWebsite(website);
        setShowModal(true);
        
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({id, name, email, phone, website})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Failed to update employee');
            }
        })
        .catch(()=>{
            setIsError({status:true, msg:'Failed to update employee'});
        })
    }

    const handleUpdate = async () =>{
        // validate before submitting
        const { valid, newErrors } = validateForm();
        if (!valid){
            // show first validation error via toast as brief feedback
            const firstKey = Object.keys(newErrors)[0];
            const firstMsg = newErrors[firstKey];
            toast.error(firstMsg || 'Please fix the form errors');
            return;
        }

        const allData = {name, email, phone, website};

        try {
            // use PUT to update the user (GET cannot have a body)
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
                    method:'PUT',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(allData)
                });
                if(!response.ok){
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to update employee');
                }
            const UPDATEDATA = EmployeeData.map((eachEmployee)=>{
                if(eachEmployee.id === editId){
                    return{...eachEmployee, ...allData}
                }else{
                    return eachEmployee
                }
            })
            setEmployeeData(UPDATEDATA);
            setEditId(null);
            setName('');
            setEmail('');
            setPhone('');
            setWebsite('');
            setShowModal(false);
            setErrors({});
            // show success toast on update
            toast.success('Employee updated successfully');
        } catch (error) {
            setIsError({status:true, msg:error.message || 'something went wrong'});
            toast.error(error.message || 'Failed to update employee');
        }
    }

    useEffect(()=>{
        fetchApi(URL)
    },[])

    if(Loading){
        return <p className="text-center mt-5" style={{color:"#12abdb"}}>Employee Data Loading...</p>
    }

    if(isError?.status){
        return <p className="text-center mt-5" style={{color:"red"}}>{isError?.msg}</p>
    }


    return(
        <div>
        <Header/>
       
        <div className="container">
            {/* Inline styles do not support '!important' — remove it */}
            <h4 className="mt-3 mb-3">Total Employees: {EmployeeData.length}</h4>

            {showModal && (
                <div className="shadow p-3 mb-2 mt-4">
                <div>
                    <input
                        type="text"
                        className={`form-control rounded-0 ${errors.name ? 'is-invalid' : ''}`}
                        value={name}
                        onChange={(e)=> { setName(e.target.value); if(errors.name) setErrors(prev=> ({...prev, name: ''})); }}
                        placeholder="Employee name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mt-2">
                    <input
                        type="email"
                        className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
                        value={email}
                        onChange={(e)=> { setEmail(e.target.value); if(errors.email) setErrors(prev=> ({...prev, email: ''})); }}
                        placeholder="Email"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mt-2">
                    <input
                        type="tel"
                        className={`form-control rounded-0 ${errors.phone ? 'is-invalid' : ''}`}
                        value={phone}
                        onChange={(e)=> { setPhone(e.target.value); if(errors.phone) setErrors(prev=> ({...prev, phone: ''})); }}
                        placeholder="Phone"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="mt-2">
                    <input
                        type="text"
                        className={`form-control rounded-0 ${errors.website ? 'is-invalid' : ''}`}
                        value={website}
                        onChange={(e)=> { setWebsite(e.target.value); if(errors.website) setErrors(prev=> ({...prev, website: ''})); }}
                        placeholder="Website (optional)"
                    />
                    {errors.website && <div className="invalid-feedback">{errors.website}</div>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary rounded-0 mt-2" onClick={handleUpdate} disabled={false}>Update</button>
                </div>
            </div>
            )}

            {/* Toast container for notifications */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="row">
                {EmployeeData.map((eachEmployee)=>{
                    const {id, name, email, phone, website} = eachEmployee;
                    return(
                        <div className="col-12 col-md-4" key={id}>
                            <div className="shadow p-3 mb-2">
                                <p><b>Name:</b> {name}</p>
                                <p><b>Email:</b> {email}</p>
                                <p><b>Phone:</b> {phone}</p>
                                <p><b>Website:</b> {website}</p>
                                <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                   <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                   <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, phone, website)}>Edit</button>
                                   {/* Use Link with `to` prop instead of calling navigate in onClick */}
                                   <button className="btn btn-warning rounded-0" onClick={handlePost}>Post</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

        <Footer/>

         </div>
    )
}

export default Usestate6;