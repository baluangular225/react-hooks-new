import React, { useState } from "react";

const UseCustomHook1 = () => {

    const [count, setCount] = useState(0);
    
    const myFunction = () =>{
        setCount(count + 1);
    }

    return (
        <div className="container">
            <h1>UseCustomHook1 Component</h1>
            <div>
                <button className="btn btn-primary rounded-0" onClick={myFunction}>{count}</button>
            </div>
        </div>
    )
};

export default UseCustomHook1;