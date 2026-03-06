import React, { useState } from 'react'

const Usestatepratice3 = () => {

 const [showData, setShowData] = useState(false);

 const handleChange = () =>{
    setShowData(!showData);
 }

  return (
    <div>
        <div className='container'>
            <h3 className='mt-4'>Usestatepratice3</h3>

            <button className='btn btn-info rounded-0' onClick={handleChange}>{showData ? "Hide" : "Show"}</button>
             {/* {showData && <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>} */}

             {showData ? <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p> : <p>Data not found</p>}
        </div>
    </div>
  )
}

export default Usestatepratice3;
