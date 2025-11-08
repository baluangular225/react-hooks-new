import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Usestate5 = () =>{

 const URL="https://jsonplaceholder.typicode.com/users";

 const [myData, setMyData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''});
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [website, setWebsite] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');


 const fetchApi = async (apiUrl) =>{
    setIsLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMyData(data);
        console.log(data);
        setIsLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('API 404 Error');
        }
    } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError({status:true, msg:error.message || 'something went wrong'});
    }
 }

 const handleDelete = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'User Delete Failed');
        }
        setMyData(myData.filter(eachData=> eachData.id !== id))
    } catch (error) {
        setIsLoading(false);
        setIsError({status:true, msg:error.message || 'something went wrong'});
    }
 }

 const handleEdit = async (id, name, email, phone, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setPhone(phone);
    setWebsite(website);

    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, name, email, phone, website})
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed to Edit user');
        }
    })
    .catch(error=>{
        setIsLoading(false);
        setIsError({status:true, msg:error.message || 'something went wrong'});
    })

 }

 const updateData = async () =>{
      const userDetails ={
        name,
        email,
        phone,
        website
      }
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userDetails)
        })
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'User Update Failed');
        }

        const UPDATEMYDATA = myData.map((eachData) => {
            if (eachData.id === editId) {
                return { ...eachData, ...userDetails };
            } else {
                return eachData;
            }
        });
        setMyData(UPDATEMYDATA);
        setEditId(null);
        setName('');
        setEmail('');
        setPhone('');
        setWebsite('');
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
    fetchApi(URL)
 },[])

 if(isLoading){
    return <h2 className="text-center mt-5 text-primary">My DataLoading...</h2>
 }

 if(isError?.status){
    return <h2 className="text-center mt-5 text-danger">Error: {isError?.msg}</h2>
 }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h4 className="mt-4 mb-4" style={{color:'#0070ad'}}>Usestate5 Component</h4>

                   <div className="mb-3 mt-3 shadow p-3">
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
                        <input type="text" className="form-control mb-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type="text" className="form-control mb-2" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                        <button type="submit" className="btn btn-primary" onClick={() => updateData(editId)}>Update User</button>
                   </div>

                    <div className="row">
                        {myData.map((eachData)=>{
                            const {id, name, email, phone, website} = eachData;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mt-3 mb-3">
                                        <h5>{name}</h5>
                                        <p>Email: {email}</p>
                                        <p>Phone: {phone}</p>
                                        <p>Website: {website}</p> 
                                        <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                          <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                          <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, phone, website)}>Edit</button>
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

export default Usestate5;