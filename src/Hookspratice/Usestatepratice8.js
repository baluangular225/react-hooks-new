import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Usestatepratice8 = () =>{

    const URL="https://jsonplaceholder.typicode.com/users";

    const [vendorData, setVendorData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [validationError, setValidationError] = useState(false);
    

    const fetchAPI = async (apiUrl) =>{
        setIsLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setVendorData(data);
            setIsError({status:false, msg:''});
            setIsLoading(false);
            if(response.status === 404){
                throw new Error('API 404 Error');
            }
        } catch (error) {
            setIsError({status:true, msg:'Error fetching vendor data'});
            setIsLoading(false);
        }
    }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'User Delete Failed');
            }
            setVendorData(vendorData.filter(eachVendor=> eachVendor.id !== id))
        } catch (error) {
            console.log(error);
        }
    }
    

    const handleEdit = async (id, name, email, website, phone, address) =>{
        setEditId(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setPhone(phone);
        setCity(address?.city);
        setShowForm(true);
        

       await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({name, email, website, phone, address:{city}})
       })

       .then(response =>{
           if(!response.ok){
               throw new Error('User Update Failed');
           }
       })

         .catch((error)=>{
             setIsError({status:true, msg:error.message || 'something went wrong'});
         })

    }

    const handleUpdate = async () =>{

       const vendorDetails = {name, email, website, phone, address:{city}}

        if(!name || !email || !website || !phone || !city){
            setValidationError(true);
            return;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(vendorDetails)
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'User Update Failed');
            }
            const updateVendorData = vendorData.map((eachVendor)=>{
                if(eachVendor.id === editId){
                    return {...eachVendor, ...vendorDetails}
                }else{
                    return eachVendor;
                }
            })
            setVendorData(updateVendorData);
             setEditId(null);
             setName('');
             setEmail('');
             setWebsite('');
             setPhone('');
             setCity('');
             setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
       fetchAPI(URL);
    },[])

    if(isLoading){
        return <h5 className="mt-3 mb-3 text-center" style={{color:'#0070ad'}}>Vendor Data Loading...</h5>
    }

    if(isError?.status){
        return <h5 className="mt-5 text-center">{isError?.msg}</h5>
    }

    return(
        <div>
            <div className="container">
                <h5 className="mt-3 mb-3">Usestatepratice8 Component</h5>   

                {showForm && (
                <div className="shadow p-3 mt-3 mb-3">
                    <input type="text" className="form-control rounded-0 mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    <input type="tel" className="form-control mb-2" name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
                    {validationError && <p className="text-danger">Please fill in all fields</p>}
                    <input type="submit" className="btn btn-primary" value='Submit' onClick={()=> handleUpdate(editId)} />
                </div>
                )}

                <div className="row">
                    {vendorData.map((eachVendor)=>{
                        const {id, name, email, website, phone, address} = eachVendor;
                        return(
                            <div key={id} className="col-12 col-md-4">
                                <div className="shadow p-3 mt-3 mb-3" style={{borderBottom: '3px solid #12abdb'}}>
                                    <h4>{name}</h4>
                                    <p><strong>Email:</strong> {email}</p>
                                    <p><strong>Website:</strong> {website}</p>
                                    <p><strong>Phone:</strong> {phone}</p>
                                    <p><strong>City:</strong> {address?.city}</p>
                                    <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                      <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                      <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website, phone, address)}>Edit</button>
                                      <NavLink className="btn btn-info rounded-0" to={`/Usestatepratice8/${id}`}>View Details</NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Usestatepratice8;