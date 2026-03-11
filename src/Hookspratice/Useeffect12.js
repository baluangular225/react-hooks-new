import React, { useEffect, useState } from 'react'

const Useeffect12 = () => {

 const URL="https://jsonplaceholder.typicode.com/users";

 const [userData, setUserData] = useState([]);
 const [error, setError] = useState({status:false, msg:''});
 const [loading, setLoading] = useState(false);

 const fetchUserData = async (apiUrl) =>{
    setError({status:false, msg:''});
    setLoading(true);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        setError({status:false, msg:''});
    } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setError({status:true, msg:'Failed to fetch user data'});
    }
 }

 useEffect(()=>{
   fetchUserData(URL);
 },[])

 if(loading){
    return <h5 className='text-center mt-5' style={{color:'green'}}>Loading UserData...</h5>
 }

 if(error?.status){
    return <h5 className='text-center mt-5' style={{color:'red'}}>{error?.msg}</h5>
 }

  return (
    <div>
        <div className='container'>
            <h2 className='mb-4 mt-4'>UseEffect Hook</h2>

            <div className='row'>
                {userData.map((eachUser)=>{
                    const {id, name, email, website, address} = eachUser;
                    return(
                        <div key={id} className='col-12 col-md-4'>
                            <div className='card mb-4'>
                                <div className='card-body'>
                                    <h5>{name || 'Name not found'}</h5>
                                    <p>{email || 'Email not found'}</p>
                                    <p>{website || 'Website not found'}</p>
                                    <p>{address?.city || 'City not found'}</p>
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

export default Useeffect12
