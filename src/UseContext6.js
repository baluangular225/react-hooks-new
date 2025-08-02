import React, { useContext } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer';
import { userContext4 } from './Usecontext/userContext4';

const UseContext6 = () => {

 const userDetails = useContext(userContext4);

 console.log(userDetails);

  return (
    <div>
        <Header/>
            <div className='container'>
                <h3>useContext6 Component</h3>

                <div className='row'>
                    {userDetails.length === 0 ?('<h1>No Data Found</h1>') : (
                        userDetails.map((eachuser)=>{
                            const {id, name, email, website, address} = eachuser;
                            const city = address?.city || "No City"; // Safe access to city
                            return(
                                <div key={id} className='col-4 col-xs-12'>
                                    <div className='shadow p-3 mb-3'>
                                         <p>{name}</p>
                                         <p>{email}</p>
                                         <p>{website}</p>
                                         <p>{city}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

            </div>
        <Footer/>
    </div>
  )
}

export default UseContext6;
