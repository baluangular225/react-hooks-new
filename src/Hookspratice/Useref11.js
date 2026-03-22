import React, { useEffect, useRef, useState } from 'react'

// useref one page how many times render display in ui used in Useref you can use useState that time infinity loop render app crash

const Useref11 = () => {

    const [inputValue, setInputValue] = useState("");
    const rednerCount = useRef(0)

    useEffect(()=>{
        rednerCount.current = rednerCount.current + 1;
    })

  return (
    <div>
       <div className='container'>
            <h2>useRef Hook Component</h2>

            <input type='text' value={inputValue} onChange={(e)=> setInputValue(e.target.value)} className='form-control' />
              <h5>input value: {inputValue}</h5>
              <h5>Render value: {rednerCount.current}</h5>
       </div>
    </div>
  )
}

export default Useref11;
