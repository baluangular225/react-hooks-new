import React, { useContext } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { UserContext3 } from "./Usecontext/userContext3";

const Usecontext5 = () =>{

    const VendorDetails = useContext(UserContext3)
    console.log(VendorDetails)

    return(
        <div>
            <Header/>
               <div className="container">
                   <div className="row">
                       {VendorDetails === undefined ? (
                           <p>Loading or no data available.</p>
                       ) : (
                           VendorDetails.map((eachVendor) => {
                               const { id, name, email, phone, website } = eachVendor;
                               return (
                                   <div key={id} className="col-4 col-xs-12">
                                       <div className="shadow p-3 mb-3">
                                           <h5 className="card-title">{name}</h5>
                                           <p className="card-text">
                                               <strong>Email:</strong> {email}<br />
                                               <strong>Phone:</strong> {phone}<br />
                                               <strong>Website:</strong> {website}
                                           </p>
                                       </div>
                                   </div>
                               );
                           })
                       )}
                   </div>
               </div>
            <Footer/>
        </div>
    )
}

export default Usecontext5