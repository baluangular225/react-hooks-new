import React,{useContext} from "react";
import { UserContext } from "./Usecontext/userContext"; 

const Usecontext2 = () =>{

   const data = useContext(UserContext);
   console.log(data)

   const {name, age, email} = data;//destructuring

    return(
        <div className="container">
            <h5 style={{color:'#12abdb'}} className="mt-5">this is working on without passing Props</h5>
            <h4>{name}</h4>
            <h4>{age}</h4>
            <h4>{email}</h4>
        </div>
    )
}

export default Usecontext2;