import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { NavLink, useNavigate } from "react-router-dom";

const UsestateSample = () =>{

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:""});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [city, setCity] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [validation, setValidation] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const navigate = useNavigate();

 const URL="https://jsonplaceholder.typicode.com/users";

 const fetchApi = async (apiUrl) =>{
    setLoading(true);
    setIsError({status:false, msg:""});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        setIsError({status:false, msg:""});
        if(response.status === 404){
            throw new Error('Please enter a valid URL API 404');
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setIsError({status:true, msg:error.message || "something went wrong"});
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
            throw new Error(data.message || 'user not deleted');
        }
        setUserData(userData.filter(eachUser=> eachUser.id !== id))
    } 
    catch (error) {
        console.log(error)
    }
 }

 const handleEdit = async (id, name, email, website, city) =>{
     setEditId(id);
     setName(name);
     setEmail(email);
     setWebsite(website);
     setCity(city);
     setShowForm(true)
     await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({name, email, website, address:{city}})
     })
     .then(response=>{
        if(response.ok){
            throw new Error('User Data Edited Successfully');
        }
     })
     .catch((error)=>{
        console.log(error);
     })
     
 }

 const handleUpdate = async () =>{
    const allData = {name, email, website, address:{city}};

    if(!name || !email || !website || !city){
        setValidation('All fields are required');
        return
    }

    setValidation(false);

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
        method:'PUT',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(allData)
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'something went wrong');
        }
        const UPDATEDATA = userData.map((eachUser)=>{
            if(eachUser.id === editId){
                return{...eachUser, ...allData};
            }else{
                return eachUser
            }
        })
        setUserData(UPDATEDATA);
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
        setCity('');
        setShowForm(false);
    } catch (error) {
        console.log(error);
    }
    
 }

 useEffect(()=>{
    fetchApi(URL)
 },[])

if(loading){
    return <h3 className="text-center mt-5" style={{color:'green'}}>Loading User Data...</h3>
}

if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
}

    return(
        <div>
            <Header/>
               <div className="container">
                {showForm &&(
                 <div className="shadow p-3 mt-3 mb-3">
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
                    {validation && <p className="text-danger">{validation}</p>}
                    <button type="submit" className="btn btn-primary" onClick={()=> handleUpdate(editId)}>Submit</button>
                 </div>
                 )}

               <div className="shadow p-3 mt-3 mb-3">
                 <h5 style={{color:'green'}}>Total Users: {
                        userData.filter((eachUser) =>
                            eachUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            eachUser.address.city.toLowerCase().includes(searchTerm.toLowerCase())).length}</h5>

                  <input type="text"
                        className="form-control mb-3 rounded-0"
                        placeholder="Search by name or city"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                </div>

                        <div className="row">
                        {userData
                            .filter((eachUser) =>
                            eachUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            eachUser.address.city.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((eachUser) => {
                            const { id, name, email, website, address: { city } } = eachUser;
                            return (
                                <div key={id} className="col-4 col-xs-12 mb-3">
                                <div className="shadow p-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <p>{city}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                    <button className="btn btn-danger rounded-0" onClick={() => handleDelete(id)}>Delete</button>
                                    <button className="btn btn-primary rounded-0" onClick={() => handleEdit(id, name, email, website, city)}>Edit</button>
                                    <NavLink className="btn btn-info rounded-0" to={`/usestatesample/${id}`}>Details</NavLink>
                                    <button className="btn btn-warning rounded-0" onClick={() => navigate(`/usestatepost1`)}>Post</button>
                                    </div>
                                </div>
                                </div>
                            );
                            })}
                        </div>


               </div>
            <Footer/>
        </div>
    )
}

export default UsestateSample;