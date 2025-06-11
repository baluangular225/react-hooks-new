import React, { useEffect, useState } from "react";

export const UserContext3 = React.createContext();

export const UserContextProvider4 = ({ children }) =>{

const URL="https://jsonplaceholder.typicode.com/users";

 const [vendorData, setVendorData] = useState([]);
 const [loading, setLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''})

 const fetchApiData = async (apiUrl) =>{
    setLoading(true);
    setIsError({status:false, msg:""});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setVendorData(data);
        setLoading(false);
        setIsError({status:false, msg:""});
        if(response.status === 404){
            throw new Error('Please enter a valid URL API 404');
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setIsError({status:true, msg:"something went wrong"});
    }
 }

 useEffect(()=>{
    fetchApiData(URL)
 },[])

 if(loading){
    return <h3 className="text-center mt-5" style={{color:'green'}}>Loading Data...</h3>
 }

 if(isError?.status){
    return <h3 className="text-center mt-5 text-danger">{isError?.msg}</h3>
 }


    return(
        <UserContext3.Provider value={vendorData}>
            {children}
        </UserContext3.Provider>
    )
}