import React, { createContext, useEffect, useState } from 'react'

export const userContext4 = createContext()

export const UserContextProvider5 = ({children}) =>{

  const URL="https://jsonplaceholder.typicode.com/users";

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({status: false, msg: ""});

  const fetchUserData = async (apiUrl) =>{
      setLoading(true);
      setIsError({status: false, msg: ""});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        setIsError({status: false, msg: ""});
        if(response.status === 404){
            throw new Error('Please enter a valid URL API 404');
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setIsError({status: true, msg: error.message || "something went wrong"});
    }
  }


  useEffect(()=>{
    fetchUserData(URL);
  },[])

  if(loading){
    return <p className='text-center mt-5' style={{color:'green'}}>Loading...</p>
  }

  if(isError?.status){
    return <p className='text-center mt-5' style={{color:'red'}}>{isError?.msg}</p>
  }

    return(
        <userContext4.Provider value={userData}>
           {children}
        </userContext4.Provider>
    )
}

