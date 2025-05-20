import { useEffect, useState } from "react";

const Usecustomhook = (URL) => {

   const [userData, setUserData] = useState([]);
   const [Loading, setLoading] = useState(false);
   const [isError, setIsError] = useState({status: false, msg: ""});

   const fetchApi = async (apiUrl) =>{
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
      fetchApi(URL);
   },[])

    return [userData, Loading, isError];
  
}

export default Usecustomhook;
