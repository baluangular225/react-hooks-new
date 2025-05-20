import React from "react";
import loader from "../src/Loading-img1.gif";

const Progress = () =>{

    return(
        <div>
            <div className="container">
            <h1>Progress</h1>
            <div className="mt-2 text-center">
                <div className="shadow">
                    <img src={loader} alt={loader} />
                </div>
            </div>
            </div>
        </div>
    )
}

export default Progress;