import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Usestatepratice88 = () =>{

    const [vendorData, setVendorData] = useState([]);

    const {userId} = useParams();

    const navigate = useNavigate();

    const fetchAPI = async (userId) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const data = await response.json();
            setVendorData(data);
        } catch (error) {
            console.error("Error fetching vendor data:", error);
        }
    }

    useEffect(()=>{
       fetchAPI(userId)
    },[userId])

    return(
        <div>
            <div className="container">
                <h5 className="mt-3 mb-3">Usestatepratice88 Component</h5>

               <div className="row">
                  {vendorData ? (
                    <div className="col-12 col-md-12">
                        <div className="shadow p-3 mt-3 mb-3">
                            <h6> <b>Name:</b> {vendorData.name}</h6>
                            <p> <b>Email:</b> {vendorData.email}</p>
                            <p> <b>Website:</b> {vendorData.website}</p>
                            <p> <b>Phone:</b> {vendorData.phone}</p>
                            <p> <b>City:</b> {vendorData.address?.city}</p>
                            <p> <b>Street:</b> {vendorData.address?.street}</p>
                            <p> <b>Suite:</b> {vendorData.address?.suite}</p>
                            <p> <b>Zipcode:</b> {vendorData.address?.zipcode}</p>
                        </div>
                    </div>
                  ) : (
                    <p className="mt-3 mb-3 text-center" style={{color:'#0070ad'}}>Vendor Data Loading...</p>
                  )}
               </div>

               <button className="btn btn-primary rounded-0" onClick={()=> navigate('/Usestatepratice8')}>Go Back</button>

            </div>
        </div>
    )
};

export default Usestatepratice88;