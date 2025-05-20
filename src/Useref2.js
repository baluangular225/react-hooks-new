import React, { useRef, useState } from 'react';

const Useref2 = () => {
 
    const [input, setInput] = useState('');
    const inputRef = useRef('')

    const focus = () =>{
        inputRef.current.focus();
        // inputRef.current.value = 'Hello Balu';// this is not current way
    }

  return (
    <div className='container'>
      <h4>Useref2</h4>
        <input ref={inputRef} type='text' id='value' onChange={(e) => setInput(e.target.value)} />
        <p>value: {input}</p>
        <button className='btn btn-primary' onClick={focus}>Click Here</button>
    </div>
  );
};

export default Useref2;
