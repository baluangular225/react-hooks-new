import React from "react";
import {Data1, Data2} from "../Data1";
console.log(Data1 , Data2);

const Importexport = () =>{

    return(
        <div>
            <div className="container">
                <h3>Import Export {Data1.length}</h3>
                <div className="row">
                    {Data1.map((DataItem)=>{
                        const {id, name, email, website, address} = DataItem;
                        const {city} = address;
                        return(
                            <div key={id} className="col-xs-12 col-4">
                                <div className="card mb-3"></div>
                                    <div className="card-body shadow p-3">
                                        <h5 className="card-title">{name}</h5>
                                        <p className="card-text">{email}</p>
                                        <p className="card-text">{website}</p>
                                        <p className="card-text">{address?.city}</p>
                                    </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Importexport