import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Userchart from "./Charts/Userchart";

const UseDetails7 = () => {

    const {userId} = useParams();

    const navigation = useNavigate();

    const [myData, setMyData] = useState([]);

    const fetchApi = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setMyData(data);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    }

    useEffect(()=>{
         fetchApi(userId);
    },[userId])

    return(
        <div>
            <Header />
                <div className="container">
                    <h5 className="mt-3 mb-3">UseDetails7 Component</h5>
                     <div className="row shadow p-3 mt-4 mb-4">
                        <div className="col-7 col-md-7">
                            {myData ? (
                                <div>
                                    <p><b>Name:</b> {myData.name}</p>
                                    <p><b>Username:</b> {myData.username}</p>
                                    <p><b>Email:</b> {myData.email}</p>
                                    <p><b>Phone:</b> {myData.phone}</p>
                                    <p><b>Website:</b> {myData.website}</p>
                                    <p><b>Company:</b> {myData.company?.name}</p>
                                    <p><b>Address:</b> {myData.address?.street}, {myData.address?.suite}, {myData.address?.city}, {myData.address?.zipcode}</p>
                                </div>
                            ):(
                                <p>Loading user data...</p>
                            )}
                        </div>
                        <div className="col-5 col-md-5">
                             <div className="p-3 mb-2 h-100 d-flex align-items-center justify-content-center">
                                  <Userchart user={myData} />
                                 
                            </div>
                        </div>
                         <button className="btn btn-primary rounded-0 mt-2" onClick={()=> navigation(`/Usestate7`)}>Go Back</button>
                     </div>
                </div>
            <Footer />
        </div>
    )
}

export default UseDetails7;