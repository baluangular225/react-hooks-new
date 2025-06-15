import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { useNavigate, useParams } from 'react-router-dom'

const UsestateDetails1 = () => {

    const {userId} = useParams();
    const naviagete = useNavigate();

    const [managerData, setManagerData] = useState([]);

    const fetchUserData = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setManagerData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
         fetchUserData(userId);
    },[userId])

  return (
    <div>
        <Header/>
            <div className='container'>
                <h4 className='mt-3 mb-3'>UsestateDetails1</h4>

                <div className='row'>
                    {managerData ? (
                       <div className='col-12 col-xs-12 mt-5'>
                           <div className='shadow p-3'>
                              <p><b>Name: </b>{managerData.name}</p>
                              <p><b>Email: </b>{managerData.email}</p>
                              <p><b>Phone: </b>{managerData.phone}</p>
                              <p><b>Website: </b>{managerData.website}</p>
                              <p><b>City: </b>{managerData?.address?.city}</p>
                              <p><b>Suite: </b>{managerData?.address?.suite}</p>
                               <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                   <button className='btn btn-primary rounded-0' onClick={()=> naviagete(`/usestatesample1`)}>Go Back</button>
                               </div>
                           </div>
                       </div>
                    ):(
                        <p>Manager Data not found</p>
                    )}
                </div>

            </div>
        <Footer/>
    </div>
  )
}

export default UsestateDetails1
