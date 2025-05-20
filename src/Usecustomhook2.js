import React, {  } from 'react'
import Usecustomhook from './Usecustomhook';
import Header from './Components/Header';

const Usecustomhook2 = () => {

   const URL ="https://jsonplaceholder.typicode.com/users";

   const [myData, Loading, isError] = Usecustomhook(URL);

   if(Loading){
      return <h3 className='text-center mt-5' style={{color:"green"}}>Loading User Data...</h3>
   }

   if(isError?.status){
      return <h3 className='text-center mt-5' style={{color:'red'}}>{isError?.msg}</h3>
   }

  return (
    <div>

    <Header/>

    <div className='container'>
        <h1>Usecustomhook2</h1>

        <div className='row'>
            {myData.map((eachData)=>{
                const {id, name, email, address} = eachData;
                const {city} = address ? address : 'NOT AVAILABLE';
                return(
                    <div key={id} className='col-4 col-xs-12'>
                        <div className='shadow p-3 mt-3 mb-3'>
                            <p>{name}</p>
                            <p>{email}</p>
                            <p>{city}</p>
                        </div>
                    </div>
                )
            })}
        </div>

    </div>
    </div>
  )
}


export default Usecustomhook2
