import React, {useState} from "react";

const Usestatepratice1 = () =>{

    const [value, setValue] = useState(0);

    const increment = () =>{
        setValue(value + 1)
        // setValue(value + 1)
        setValue(prevalue => prevalue + 1)
    }

    const decrement = () =>{
        setValue(value - 1)
        setValue(prevalue => prevalue - 1)
    }

    return(
        <div>
           <div className="container">
               <h3>Usestatepratice1</h3>

               <button className="btn btn-primary" onClick={decrement}>-</button>
               <span className="">{value}</span>
               <button className="btn btn-primary" onClick={increment}>+</button>
           </div>
        </div>
    )
}

export default Usestatepratice1;