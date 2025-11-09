import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Userchart from "./Charts/Userchart";

const UseDetails6 = () => {

    const navigate = useNavigate();

    const {userId} = useParams();
    const [userData, setUserData] = useState([]);

    const fetchApi = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    }

    useEffect(()=>{
       fetchApi(userId);
    },[userId])

    return(
        <div>
            <Header/>
                 <div className="container">
                    <h5 className="mt-3 mb-3">UseDetails6 Component</h5>

                    <div className="row shadow">
                        <div className="col-12 col-md-4">
                            <div className="p-3 mb-2 h-100">
                                {userData ? (
                                    <div>
                                        <p><b>Name:</b> {userData.name}</p>
                                        <p><b>Username:</b> {userData.username}</p>
                                        <p><b>Email:</b> {userData.email}</p>
                                        <p><b>Phone:</b> {userData.phone}</p>
                                        <p><b>Website:</b> {userData.website}</p>
                                        <p><b>Company:</b> {userData.company?.name}</p>
                                        <p><b>Address:</b> {userData.address?.street}, {userData.address?.suite}, {userData.address?.city}, {userData.address?.zipcode}</p>
                                        
                                    </div>
                                ) : (
                                    <p>Loading user data...</p>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-md-8">
                            <div className="p-3 mb-2 h-100 d-flex align-items-center justify-content-center">
                                    <Userchart user={userData} />
                                     
                            </div>
                        </div>
                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-primary rounded-0" onClick={() => navigate(`/Usestate6`)}>Back </button>
                        </div>
                    </div>

                 </div>
            <Footer/>
        </div>
    )
}

export default UseDetails6;