import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Usestatepratice9 = () =>{

    const URL="https://jsonplaceholder.typicode.com/users";

    const [BallaData, setBallaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({status:false, msg:''});
    const [EditId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [showForm, setShowForm] = useState(false);

    const fetchApi = async (apiUrl)=>{
        setLoading(true);
        setError({status:false, msg:''});
        try {
            const respone = await fetch(apiUrl);
            const data = await respone.json();
            setBallaData(data);
            setLoading(false);
            setError({status:false, msg:''});
            if(respone.status === 404){
                throw new Error('API 404 Error');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError({status:true, msg : error.message || 'Error fetching Balla data'});
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
            setBallaData(BallaData.filter(eachBalla => eachBalla.id !== id))
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

        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({name, email, website, phone, address:{city}})
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error('User Update Failed');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () =>{

        const ballaDetails = {name, email, website, phone, address:{city}};

        try {
            const respone = await fetch(`https://jsonplaceholder.typicode.com/users/${EditId}`,{
                method:'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(ballaDetails)
            })
            if(!respone.ok){
                const data = await respone.json();
                throw new Error(data.message || 'User Update Failed');
            }
            const UPDATEBALLA = BallaData.map((eachBalla)=>{
                if(eachBalla.id === EditId){
                    return {...eachBalla, ...ballaDetails}
                }else{
                    return eachBalla;
                }
            })
            setBallaData(UPDATEBALLA);
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
       fetchApi(URL)
    },[])

    if(loading){
        return <h5 className="text-center mt-5">Loading Data Balla...</h5>
    }

    if(error?.status){
        return <h5 className="text-center mt-5">{error?.msg}</h5>
    }

    return(
        <div>
            <div className="container">
                <h5 className="mt-3 mb-3">Usestatepratice9 Component:{BallaData.length}</h5>

               {showForm && (
                <div className="shadow p-3 mt-3 mb-3">
                    <input type='text' className="form-control mb-2" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type='email' className="form-control mb-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='text' className="form-control mb-2" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    <input type='text' className="form-control mb-2" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type='text' className="form-control mb-2" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    <input type="submit" className="btn btn-primary rounded-0" onClick={()=> handleUpdate(EditId)} />
                </div>
                )}

                <div className="row">
                    {BallaData.map((eachBalla)=>{
                        const {id, name, email, website, phone, address} = eachBalla;
                        return(
                            <div key={id} className="col-md-4 col-12mb-3 mt-3">
                             <div className=" shadow p-3 ">
                                <h5 style={{color:'#0070ad'}}>{name}</h5>
                                <p>{email}</p>
                                <p>{website}</p>
                                <p>{phone}</p>
                                <p>{address?.city}</p>
                                <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                   <button class="btn btn-danger rounded-0" onClick={() => handleDelete(id)}>Delete</button>
                                   <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website, phone, address)}>Edit</button>
                                   <NavLink className="btn btn-info rounded-0" to={`/Usestatepratice9/${id}`}>Details Balla</NavLink>
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

export default Usestatepratice9;