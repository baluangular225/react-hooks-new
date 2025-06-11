import React, { useContext } from "react";
import { UserContext2 } from "./Usecontext/userContext2";

const Usecontext4 = () => {

  const myData = useContext(UserContext2)
  console.log(myData);

  // if(!myData){
  //   return <div>myData not found</div>;
  // }

  return (
    <div className="container">
        <div className="row">
       {myData ? (
            myData.map((eachuser) => {
              const { id, name, email, phone, website } = eachuser;
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
          ) : (
            <p>myData Not Found</p>
          )}

         </div>
    </div>
  )
}

export default Usecontext4
