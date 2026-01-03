import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { NavLink } from 'react-router-dom';


const countryList = [
    { iso: 'US', flag: '🇺🇸', name: 'United States', code: '+1' },
    { iso: 'GB', flag: '🇬🇧', name: 'United Kingdom', code: '+44' },
    { iso: 'IN', flag: '🇮🇳', name: 'India', code: '+91' },
    { iso: 'CA', flag: '🇨🇦', name: 'Canada', code: '+1' },
    { iso: 'AU', flag: '🇦🇺', name: 'Australia', code: '+61' }
];

const Usestate7 = () => {

        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [isError, setIsError] = useState({status:false, msg:""});
        const [editId, setEditId] = useState(null);
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
        const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
        const [website, setWebsite] = useState("");
        const [showForm, setShowForm] = useState(false);
        const [errors, setErrors] = useState({});

     const URL="https://jsonplaceholder.typicode.com/users";

     const fetchApi = async (apiUrl)=>{
                    setLoading(true);
                    setIsError({status:false, msg:""});
             try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    setUsers(data);
                    setLoading(false);
                    setIsError({status:false, msg:""});
             } catch (error) {
                 console.log("Error fetching data:", error);
                 setIsError({status:true, msg:"Error fetching data"});
                 setLoading(false);
             }
     }

     const handleDelete = async (id) =>{
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                        method: 'DELETE',
                        headers:{
                                'Content-Type' : 'application/json'
                        }
                });
                if(!response.ok){
                        const data = await response.json();
                        throw new Error(data.message || "Failed to delete the user");
                }
                setUsers(users.filter(eachUser => eachUser.id !== id))
            } catch (error) {
                 console.log(error.message);
            }
     }

     // populate form for editing (don't PUT immediately)
     const handleEdit = (id, nameVal, emailVal, websiteVal, phoneVal) => {
                setEditId(id);
                setName(nameVal || "");
                setEmail(emailVal || "");
                setWebsite(websiteVal || "");
                // split country code if present
                if(phoneVal && phoneVal.startsWith('+')){
                        const m = phoneVal.match(/^(\+\d{1,3})\s*(.*)$/);
                        if(m){
                                const code = m[1];
                                const found = countryList.find(c => c.code === code) || countryList[0];
                                setSelectedCountry(found);
                                setPhone(m[2] || "");
                        } else {
                                setPhone(phoneVal);
                        }
                } else {
                        setPhone(phoneVal || "");
                }
                setErrors({});
                setShowForm(true);
     }

     const validate = () => {
            const newErrors = {};
            if(!name || name.trim().length < 2) newErrors.name = "Name is required (min 2 chars).";
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!email || !emailRe.test(email)) newErrors.email = "Please enter a valid email.";
            const phoneDigits = phone.replace(/[^0-9]/g, '');
            if(!phoneDigits || phoneDigits.length < 7) newErrors.phone = "Please enter a valid phone number.";
            const urlRe = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(:\d+)?(\/.*)?$/i;
            if(website && !urlRe.test(website)) newErrors.website = "Please enter a valid website URL.";
            return newErrors;
     }

     const handleUpdate = async ()=>{
            const newErrors = validate();
            if(Object.keys(newErrors).length){
                setErrors(newErrors);
                return;
            }

            const fullPhone = `${selectedCountry.code} ${phone}`.trim();

            const updatedUser = {
                name,
                email,
                phone: fullPhone,
                website
            }

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
                        method:'PUT',
                        headers:{
                                'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(updatedUser)
                })
                if(!response.ok){
                        const data = await response.json();
                        throw new Error(data.message || "Failed to update user data");
                }

                const UPDATEDATA = users.map((eachUser)=>{
                        if(eachUser.id === editId){
                                return {...eachUser, ...updatedUser}
                        }else{
                                return eachUser
                        }
                })

                setEditId(null);
                setName("");
                setEmail("");
                setPhone("");
                setSelectedCountry(countryList[0]);
                setWebsite("");
                setShowForm(false);
                setErrors({});
                setUsers(UPDATEDATA);

            } catch (error) {
                console.log(error.message);
            }
     }

     useEffect(()=>{
         fetchApi(URL)
     },[])

     const formatPhoneWithFlag = (phoneStr) => {
            if(!phoneStr) return '';
            const m = phoneStr.match(/^(\+\d{1,3})\s*(.*)$/);
            if(m){
                const code = m[1];
                const found = countryList.find(c=>c.code === code);
                return `${found ? found.flag + ' ' : ''}${m[2] || ''}`.trim();
            }
            return phoneStr;
     }

     if(loading){
            return <p className='mt-5 text-center'>Loading users Data ...</p>
     }

     if(isError?.status){
            return <p className='mt-5 text-center' style={{color:'orange'}}>{isError?.msg}</p>
     }

        return(
                <div>
                        <Header />
                             <div className='container'>
                                     <h2 className='mt-4 mb-4' style={{color:'green'}}>Usestate7 all users data: {users.length}</h2>

                                    {showForm &&(
                                     <div className='row'>
                                             <div className='shadow p-3 mt-4 mb-4 w-100' style={{borderRadius:6, background:'#fafafa'}}>
                                                    <div className='mb-2'>
                                                        <label className='form-label'>Name</label>
                                                        <input placeholder='Full name' type="text" className={'form-control mb-1 rounded-0 '+(errors.name? 'is-invalid':'')} value={name} onChange={(e)=> setName(e.target.value)} />
                                                        {errors.name && <div className='text-danger small'>{errors.name}</div>}
                                                    </div>

                                                    <div className='mb-2'>
                                                        <label className='form-label'>Email</label>
                                                        <input placeholder='email@example.com' type='email' className={'form-control mb-1 rounded-0 '+(errors.email? 'is-invalid':'')} value={email} onChange={(e)=> setEmail(e.target.value)} />
                                                        {errors.email && <div className='text-danger small'>{errors.email}</div>}
                                                    </div>

                                                    <div className='mb-2 row'>
                                                        <div className='col-4 col-md-2'>
                                                            <label className='form-label'>Country</label>
                                                            <select className='form-select rounded-0' value={selectedCountry.code} onChange={(e)=>{
                                                                const found = countryList.find(c=>c.code === e.target.value) || countryList[0];
                                                                setSelectedCountry(found);
                                                            }}>
                                                                {countryList.map(c=> (
                                                                    <option key={c.iso} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className='col-8 col-md-10'>
                                                            <label className='form-label'>Phone</label>
                                                            <input placeholder='123 4567 890' type='text' className={'form-control mb-1 rounded-0 '+(errors.phone? 'is-invalid':'')} value={phone} onChange={(e)=> setPhone(e.target.value)} />
                                                            {errors.phone && <div className='text-danger small'>{errors.phone}</div>}
                                                        </div>
                                                    </div>

                                                    <div className='mb-2'>
                                                        <label className='form-label'>Website</label>
                                                        <input placeholder='https://example.com' type='text' className={'form-control mb-1 rounded-0 '+(errors.website? 'is-invalid':'')} value={website} onChange={(e)=> setWebsite(e.target.value)} />
                                                        {errors.website && <div className='text-danger small'>{errors.website}</div>}
                                                    </div>

                                                    <div className='d-flex gap-2'>
                                                        <button className='btn btn-primary rounded-0' onClick={handleUpdate}>Update</button>
                                                        <button className='btn btn-secondary rounded-0' onClick={()=>{ setShowForm(false); setErrors({}); }}>Cancel</button>
                                                    </div>

                                             </div>
                                     </div>
                                     )}

                                        <div className='row'>
                                                {users.map((eachUser)=>{
                                                        const {id, name: uname, email: uemail, phone: uphone, website: uwebsite} = eachUser;
                                                        return(
                                                                <div key={id} className='col-12 col-md-4'>
                                                                        <div className='shadow p-3 mb-2 mt-2' style={{borderRadius:6}}>
                                                                                <h4 style={{color:'#0070ad'}}>{uname}</h4>
                                                                                <p><strong>Email:</strong> {uemail}</p>
                                                                                <p><strong>Phone:</strong> {formatPhoneWithFlag(uphone)}</p>
                                                                                <p><strong>Website:</strong> {uwebsite}</p>
                                                                                <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                                                                    <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                                                                    <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, uname, uemail, uwebsite, uphone)}>Edit</button>
                                                                                    <NavLink className="btn btn-warning rounded-0" to={`/Usestate7/${id}`} >Details</NavLink>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        )
                                                })}
                                        </div>

                             </div>
                        <Footer />
                </div>
        )
}

export default Usestate7;