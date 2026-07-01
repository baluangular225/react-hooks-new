import react, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Usestatepratice10 = () =>{

    const URL="https://jsonplaceholder.typicode.com/users";

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:""});
    const [EditId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [showForm, setShowForm] = useState(false);

    const fetchApi = async (apiUrl)=>{
        setLoading(true);
        setIsError({status:false, msg:""});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setUserData(data);
            setLoading(false);
            setIsError({status:false, msg:""});
            if(response.status === 404){
                throw new Error('API 404 Error');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setIsError({status:true, msg: error.message || 'Error fetching user data'});
        }
    }

    const handleDelete = async (id)=>{
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
            setUserData(userData.filter(eachUser => eachUser.id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    const handleEidt = async (id, name, email, website, phone, address) =>{
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
        .then(response=>{
            if(!response.ok){
                throw new Error('User Update Failed');
            }
        })
        .catch((error)=>{
            setIsError({status:true, msg:error.message || 'something went wrong'});
        })
    }

    const userUpdate = async () =>{

        const userList ={name, email, website, phone, address:{city}}

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${EditId}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(userList)
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'User Update Failed');
            }

            const updateUserData = userData.map((eachUser)=>{
                if(eachUser.id === EditId){
                    return {...eachUser, ...userList}
                }else{
                    return eachUser;
                }
            })
            setUserData(updateUserData);
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
        return <h3 className='text-center mt-5' style={{color:'#0070ad'}}>Loading UserData...</h3>
    }

    if(isError?.status){
        return <h3 className='text-center mt-5' style={{color:'red'}}>Error: {isError?.msg}</h3>
    }

    return(
        <div>
            <div className="container">
                <h1 className="mt-5">{userData.length} Users</h1>

                {showForm && (
                <div className='shadow p-3 mt-3 mb-3'>
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=>setWebsite(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="city" value={city} onChange={(e)=>setCity(e.target.value)} />
                    <button className="btn btn-primary rounded-0" onClick={()=> userUpdate(EditId)}>Add User</button>
                </div>
                )}
                <hr />

                <div className='row'>
                    {userData.map((eachUser)=>{
                        const {id, name, email, website, phone, address} = eachUser;
                        return(
                            <div key={id} className='col-6 col-xs-12'>
                                <div className='shadow p-3 mt-3 mb-3'>
                                    <h6> <b>Name:</b> {name}</h6>
                                    <p> <b>Email:</b> {email}</p>
                                    <p> <b>Website:</b> {website}</p>
                                    <p> <b>Phone:</b> {phone}</p>
                                    <p> <b>City:</b> {address.city}</p>
                                    <div class="d-grid d-md-flex justify-content-md-end">
                                      <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                      <button class="btn btn-primary rounded-0" onClick={()=> handleEidt(id, name, email, website, phone, address)} >Edit</button>
                                      <NavLink className="btn btn-warning rounded-0" to={`/Usestatepratice10/${id}`}>View Details</NavLink>
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

export default Usestatepratice10;