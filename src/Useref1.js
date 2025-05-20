import React, { useEffect, useRef, useState } from 'react';

const Useref1 = () => {
  const [value, setValue] = useState('');
  const renderCount = useRef(1);

  useEffect(()=>{
    // setCount((PrevCount)=> setCount(PrevCount + 1))
    renderCount.current = renderCount.current + 1
    console.log(renderCount)

  })

  return (
    <div className='container'>
      <h4>Useref1</h4>
      <input type='text' id='value' onChange={(e) => setValue(e.target.value)} />
      <p>value: {value}</p>

      <div>count: {renderCount.current}</div>
    </div>
  );
};

export default Useref1;
