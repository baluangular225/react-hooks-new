import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { NavLink, useNavigate } from 'react-router-dom';

const UsestateSample1 = () => {

    const URL="https://jsonplaceholder.typicode.com/users";

    const [accountManager, setAccountManager] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [city, setCity] = useState('');
    const [validation, setValidation] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const navigate= useNavigate();

    const fetchApi = async (apiUrl)=>{
        setLoading(true);
        setIsError({status:false, msg:""});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setAccountManager(data);
            setLoading(false);
            setIsError({status:false, msg:""});
        } catch (error) {
            console.log(error);
            setLoading(false);
            setIsError({status:true, msg:"something went wrong"});
        }
    }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type' : 'Application/json'
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Something went wrong');
            }
            setAccountManager(accountManager.filter(eachManager=> eachManager.id !== id))
        } catch (error) {
            console.log(error);
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
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify({id, name, email, website, address:{city}})
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
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(allData)
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Account Manager Data Not Updated');
            }
            const UPDATE = accountManager.map((eachManager)=>{
                if(eachManager.id === editId){
                    return{...eachManager, ...allData};
                }else{
                    return eachManager
                }
            })
            setAccountManager(UPDATE);
            setEditId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setCity('');
            setShowForm(false);

        } catch (error) {
            
        }
    }

    useEffect(()=>{
       fetchApi(URL)
    },[])

    if(loading){
        return <h4 className='text-center mt-5' style={{color:'green'}}>Account Manager Data Loading...</h4>
    }

    if(isError?.status){
        return <h4 className='text-center mt-5' style={{color:'red'}}>{isError?.msg}</h4>
    }

  return (
    <div>
         <Header/>
             <div className='container'>
                {showForm && (
                 <div className='shadow p-3 mt-3 mb-3'>
                    <input type='text' className="form-control mb-2" name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type='email' className="form-control mb-2" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type='text' className="form-control mb-2" name='website' value={website} onChange={(e)=>setWebsite(e.target.value)} />
                    <input type='text' className="form-control mb-2" name='city' value={city} onChange={(e)=>setCity(e.target.value)} />
                    {validation && <p className='text-danger'>{validation}</p>}
                    <input type='submit' className='btn btn-info rounded-0' onClick={()=> handleUpdate(editId)} />
                 </div>
                 )}

                <div className='row mb-5'>
                    {accountManager ? (
                       accountManager.map((eachManager) => {
                        const { id, name, email, website, address } = eachManager;
                        const city = address?.city || 'NOT AVAILABLE';

                        return (
                            <div key={id} className='col-4 col-xs-12'>
                                <div className='shadow p-3 mb-2'>
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <p>{city}</p>
                                    <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                       <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                       <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website, city)}>Edit</button>
                                       <NavLink className="btn btn-warning rounded-0" to={`/usestatesample1/${id}`}>Details</NavLink>
                                       <button className='btn btn-success rounded-0' onClick={()=> navigate(`/usestatepost2`)}>Post</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    ):(
                        <h3>Account Manager Not Found</h3>
                    )}
                </div>

             </div>
         <Footer/>
    </div>
  )
}

export default UsestateSample1;
