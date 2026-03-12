import React, { useState } from 'react'

const Usecontaxt11 = () => {

  const [userdetails, setUserdetails] = useState({
      name:'Pawan Balla',
      email:'pawan.balla@gmail.com',
      phone: 9346648689
  })
 
  return (
    <div>
        <div className='container'>
            <h2 className='mb-4 mt-4'>UseContaxt Hook</h2>
            <ChildComponent userdetails={userdetails} />
        </div>
    </div>
  )
}

const ChildComponent = (props) =>{
    return(
        <div>
            <div className=''>
                <h2 className='mb-4 mt-4'>Child Component</h2>
                <SubChildComponent userdetails={props.userdetails} />
            </div>
        </div>
    )
}

const SubChildComponent = (props) =>{
    // console.log(props.userdetails);
    const {name, email, phone} = props.userdetails;
    return(
        <div>
            <div className=''>
                <h2 className='mb-4 mt-4'>Sub Child Component</h2>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
            </div>
        </div>
    )
}

export default Usecontaxt11;
