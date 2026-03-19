import React, { useContext } from 'react'
import { Usercontext } from './Usercontext';

const Usercontextnew = () => {

    const userDetails = useContext(Usercontext)

    console.log("userDetails", userDetails);

  return (
    <div>
       <div className='container'>
            <h2 className='mb-4 mt-4'>User Context</h2>
            <div className='row'>
                {userDetails.map((eachUser)=>{
                    const {id, name, email} = eachUser;
                    return(
                        <div key={id} className='col-md-4'>
                            <div className='card mb-3 shadow p-3'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{name}</h5>
                                    <p className='card-text'>{email}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
       </div>
    </div>
  )
}

export default Usercontextnew;
