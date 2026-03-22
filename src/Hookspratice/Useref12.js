import React, { useRef, useState } from 'react'

const Useref12 = () => {

  const [firstName, setFirstName] = useState('');

  const inputDom = useRef('');

  const focusInput = () =>{
    inputDom.current.focus();
  }

  return (
    <div>
         <div className='container'>
            <h2>useRef12 Hook Component</h2>

            <input ref={inputDom} type='text' value={firstName} onChange={(e)=> setFirstName(e.target.value)} className='form-control' />
              <h5>input value: {firstName}</h5>
                <button className='btn btn-primary' onClick={focusInput}>Focus Input</button>

         </div>
    </div>
  )
}

export default Useref12
