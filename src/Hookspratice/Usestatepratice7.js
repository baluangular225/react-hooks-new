import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Usestatepratice7 = () =>{

    const URL="https://jsonplaceholder.typicode.com/users";

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [showForm, setShowForm] = useState(false);

    const fetchApi = async (apiUrl)=>{
        setIsLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setUserData(data);
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
            setUserData(userData.filter(eachUser=> eachUser.id !== id))
        } catch (error) {
            setIsError({status:true, msg:error.message || 'something went wrong'});
        }
    }

    const handleEdit = async (id, name, email, website, phone, address) =>{
       setEditId(id);
       setName(name);
       setEmail(email);
       setWebsite(website);
       setPhone(phone);
       setCity(address.city);
       setShowForm(true);

      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({name, email, website, phone, address:{city}})
      })
      .then(response=>{
         if(!response.ok){
             throw new Error('User Update Failed');
         }
      })
      .catch((error)=>{
          setIsError({status:true, msg:error.message || 'something went wrong'});
      })

    }

    const handleUpdate = async () =>{

      const UserDetails ={
        name,
        email,
        website,
        phone,
        address:{city}
      }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(UserDetails)
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'User Update Failed');
            }
            const UpdatedUser = userData.map((eachUser)=>{
                if(eachUser.id === editId){
                    return {...eachUser, ...UserDetails}
                }else{
                    return eachUser;
                }
            })
            setUserData(UpdatedUser);
            setEditId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setPhone('');
            setCity('');
            setShowForm(false);
        } catch (error) {
            setIsError({status:true, msg:error.message || 'something went wrong'});
        }
    }

    useEffect(()=>{
        fetchApi(URL);
    },[])


    if(isLoading){
        return <p className="text-center mt-5" style={{color:'#12abdb'}}>Loading userData....</p>
    }

    if(isError?.status){
        return <p className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</p>
    }

    return(
        <div>
            <div className="container">
                <h4 className="mt-3 mb-3">Usestatepratice7 Component</h4>

               {showForm && (
                <div className="shadow p-3 mb-4 mb-4">
                    <input type="text" className="form-control rounded-0" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control rounded-0" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control rounded-0" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    <input type="tel" className="form-control rounded-0" name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                    <input type="text" className="form-control rounded-0" name="address" value={city} onChange={(e)=> setCity(e.target.value)} />
                    <input type="submit" className="btn btn-primary rounded-0 mt-2" value="Submit" onClick={()=> handleUpdate(editId)}/>
                </div>
                )}

                <div className="row">
                    {userData.map((eachUser)=>{
                        const {id, name, email, website, phone, address} = eachUser;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mt-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <p>{phone}</p>
                                    <p>{address.city}</p>
                                    <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                      <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                      <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website, phone, address)} >Edit</button>
                                      <NavLink className='btn btn-info rounded-0' to={`/usestatepratice7/${id}`}>User Details</NavLink>
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

export default Usestatepratice7;