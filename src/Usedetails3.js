import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useParams } from "react-router-dom";

const Usedetails3 = () =>{

 const [myData, setMyData] = useState([]);

 const {userId} = useParams();
 console.log("userId", userId);

 const myProducts = async (id) =>{
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        setMyData(data);
    } catch (error) {
        console.log("Error fetching product:", error);
    }
 }

 useEffect(()=>{
    myProducts(userId);
 },[userId])


    return(
        <div>
            <Header/>
            <div className="container">
                <h2>Details Page</h2>
                <div className="row">
                    {myData ? (
                        <div className="col-12 col-xs-12">
                            <div className="shadow p-3 mb-2">
                                <p><b>Title:</b> {myData.title}</p>
                                <p><b>Description:</b> {myData.description}</p>
                                <img src={myData.images} alt={myData.title} width={300} className="img-fluid" />
                                <p><b>Category</b> {myData.category?.creationAt}</p>
                                <p><b>Price</b> ${myData.price}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12">No product found.</div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Usedetails3;