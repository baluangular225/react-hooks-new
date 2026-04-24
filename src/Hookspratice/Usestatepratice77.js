import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Userchart from "../Charts/Userchart";

const Usestatepratice77 = () =>{

    const {userId} = useParams();

    const [empData, setEmpData] = useState(null);

    const navigation = useNavigate();

    const fetchData = async (id)=>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setEmpData(data);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    }

    useEffect(()=>{
      fetchData(userId);
    },[userId])

    return(
        <div>
            <div className="container">
                <h5 className="mt-3 mb-3">Usestatepratice77 Component</h5>

                <div className="row shadow p-3 mt-4 mb-4">

                    <div className="col-4 col-xs-12">
                        { empData ? (
                        <div className="col-12 col-xs-12">
                            <div className="">
                                <p><b>Name:</b> {empData.name}</p>
                                <p><b>Username:</b> {empData.username}</p>
                                <p><b>Email:</b> {empData.email}</p>
                                <p><b>Phone:</b> {empData.phone}</p>
                                <p><b>Website:</b> {empData.website}</p>
                                <p><b>Company:</b> {empData.company?.name}</p>
                                <p><b>Address:</b> {empData.address?.street}, {empData.address?.suite}, {empData.address?.city}, {empData.address?.zipcode}</p>
                            </div>
                        </div>
                    ):(
                        <p className="text-center mt-5" style={{color:'#12abdb'}}>Loading userData....</p>
                    )}
                    </div>
                    <div className="col-8 col-xs-12">
                        <Userchart user={empData} />
                    </div>

                <button className="btn btn-primary rounded-0" onClick={() => navigation('/Usestatepratice7')}>Go Back</button>
                </div>

            </div>
        </div>
    )
}

export default Usestatepratice77;