import { each } from "chart.js/helpers";
import React, { useState } from "react";

const Usestatepratice2 = () =>{

//  const userObject = {
//     firstName:"Pawan",
//     lastName:"Kumar",
//     email:"pawan.balla@capgemini.com"
//  }

//  const [userDetails, setUserDetails] = useState(userObject)

//  const handleUser = () =>{
//     setUserDetails({
//         ...userDetails,
//         firstName:"Pawan Balla",
//     })
//  }

 const initialvalue =[
    {
        id:1,
        name:'Pawan',
        age:24,
        email:'pawan.balla@capgemini.com'
    },
    {
        id:2,
        name:'Kumar',
        age:25,
        email:'pawan.balla@capgemini.com'
    }
 ]

 const [vendorDetails, setVendorDetails] = useState(initialvalue);

 const handleDelete = (comingId) =>{
    // console.log("coming id", comingId);
    const FilterData = vendorDetails.filter((eachVendor)=>{
        return eachVendor.id !== comingId
    })
    setVendorDetails(FilterData);
 }

    return(
        <div>
            <div className="container">
                <h3 className="mt-4">Usestatepratice2</h3>
                {/* <h4>First Name: {userDetails.firstName}</h4>
                <button className="btn btn-primary" onClick={handleUser}>Update User</button>
                <h4>Last Name: {userDetails.lastName}</h4>
                <h4>Email: {userDetails.email}</h4> */}

                <div>
                    <div className="row mt-3">
                        {vendorDetails.map((eachVendor)=>{
                            const {name, age, email, id} = eachVendor;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="card">
                                        <div className="card-body shadow p-3">
                                            <h5 className="card-title">{name || "Name not found"}</h5>
                                            <p className="card-text">Age: {age || "Age not found"}</p>
                                            <p className="card-text">Email: {email || "Email not found"}</p>
                                            <button className="btn btn-danger" onClick={()=> handleDelete(id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usestatepratice2;