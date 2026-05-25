import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Usestatepratice99 = () =>{

    const [storeData, setStoreData] = useState([]);

    const {userId} = useParams();

    const fetchData = async (storeId) =>{
        try {
            const respone = await fetch(`https://jsonplaceholder.typicode.com/users/${storeId}`)
            const data = await respone.json();
            setStoreData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(()=>{
        fetchData(userId)
    }, [userId])

    return(
        <div>
            <div className="container">
                <h1 className="text-center mt-5">Usestate Pratice 99</h1>
                {storeData ? (
                     <div className="col-12 col-md-12">
                        <div className="shadow p-3 mt-3 mb-3">
                            <h6> <b>Name:</b> {storeData.name}</h6>
                            <p> <b>Email:</b> {storeData.email}</p>
                            <p> <b>Website:</b> {storeData.website}</p>
                            <p> <b>Phone:</b> {storeData.phone}</p>
                            <p> <b>City:</b> {storeData.address?.city}</p>
                            <p> <b>Street:</b> {storeData.address?.street}</p>
                            <p> <b>Suite:</b> {storeData.address?.suite}</p>
                            <p> <b>Zipcode:</b> {storeData.address?.zipcode}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Loading user data...</p>
                )}
            </div>
        </div>
    )
}

export default Usestatepratice99;