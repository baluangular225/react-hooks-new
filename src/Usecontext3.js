import React, { useContext } from "react";
import { UserContext1 } from "./Usecontext/userContext1"; // Adjust the path as needed

const Usecontext3 = () => {

  const users = useContext(UserContext1);

  if(!users){//if data not found
    return <div>Data not found</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Users</h2>
      <div className="row">
       {users.map((eachuser) => {
            const { id, name, email, phone, website } = eachuser;
            return (
                <div className="col-md-4 mb-3" key={id}>
                <div className="shadow p-3">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">
                    <strong>Email:</strong> {email}<br />
                    <strong>Phone:</strong> {phone}<br />
                    <strong>Website:</strong> {website}
                    </p>
                </div>
                </div>
            );
            })}

      </div>
    </div>
  );
};

export default Usecontext3;
