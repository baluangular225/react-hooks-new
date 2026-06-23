import { createContext, useEffect, useState } from 'react'

export const Usercontext = createContext()

export const UsercontextProvider6 = ({ children }) =>{

  const URL = 'https://jsonplaceholder.typicode.com/users';

  const [userData, setUserData] = useState([]);

  const fetchApi = async (apiUrl) =>{
     try {
       const response = await fetch(apiUrl);
       const data = await response.json();
       setUserData(data);
     } catch (error) {
       console.log("Error fetching data:", error);
     }
  }

  useEffect(()=>{
    fetchApi(URL);
  },[])

    return (
        <Usercontext.Provider value={userData}>
          {children}
        </Usercontext.Provider>
    )
}