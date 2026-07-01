import react, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Usestatepratice66 = () =>{

    const [getData, setGetData] = useState([]);

    const { userId} = useParams();

    const apiFtech = async (userDetails) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userDetails}`);
            const data = await response.json();
            setGetData(data);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        apiFtech(userId)
    },[userId])

    return(
        <div>
            <div className="container">
               <div className='row'>
                  {getData ? (
                    <div className="col-12">
                        <div className="shadow p-3 mt-3 mb-3">
                            <h6> <b>Name:</b> {getData.name}</h6>
                            <p> <b>Email:</b> {getData.email}</p>
                            <p> <b>Website:</b> {getData.website}</p>
                            <p> <b>Phone:</b> {getData.phone}</p>
                            <p> <b>City:</b> {getData.address?.city}</p>
                            <p> <b>Street:</b> {getData.address?.street}</p>
                            <p> <b>Suite:</b> {getData.address?.suite}</p>
                            <p> <b>Zipcode:</b> {getData.address?.zipcode}</p>
                            <p> <b>Lat:</b> {getData.address?.geo?.lat}</p>
                            <p> <b>Lng:</b> {getData.address?.geo?.lng}</p>
                        </div>
                    </div>
                  ) : (
                    <p className='text-center'>Loading User Data...</p>
                  )}
               </div>
            </div>
        </div>
    )
}

export default Usestatepratice66;