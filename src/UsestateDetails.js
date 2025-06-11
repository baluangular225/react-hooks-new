import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

const UsestateDetails = () => {
  const [myDetails, setMyDetails] = useState(null); // use null instead of []
  const { userId } = useParams();
  const navigation = useNavigate();

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      setMyDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  return (
    <div>
      <Header />
      <div className='container'>
        <h4 className='mt-3 mb-3' style={{color:'#12abdb'}}>MyDetails All Data</h4>

        <div className='row'>
          {myDetails ? (
            <div key={myDetails.id} className='col-12 col-xs-12'>
              <div className='shadow p-3 mt-3 mb-3'>
                <h5>{myDetails.name}</h5>
                <p>{myDetails.email}</p>
                <p>{myDetails.phone}</p>
                <p>{myDetails.website}</p>
                <p>{myDetails.address?.city}</p>
                <p>{myDetails.address?.street}</p>
                 <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                    <button className='btn btn-primary rounded-0' onClick={()=> navigation(`/UsestateSample`)}>Go Back</button>
                 </div>
              </div>
            </div>
          ) : (
            <p>Loading Data...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsestateDetails;
