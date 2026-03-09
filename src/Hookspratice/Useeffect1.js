import React, { useEffect, useState } from 'react'

const Useeffect11 = () => {

    const [count, setCount] = useState(0);
    const [pagewidth, setPagewidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleResize = () =>{
            setPagewidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        console.log("useEffect called");
   
        return () =>{
            window.removeEventListener('resize', handleResize);
            console.log("cleanup function called");
        }// this is used to remove the event listener when the component unmounts or before the next effect runs, preventing memory leaks and ensuring that the event listener is not active when it is not needed.

    },[count])

  return (
    <div>
        <div className='container'>
            <h2 className='mb-4 mt-4'>UseEffect Hook</h2>
            <h3>Count: {count}</h3>
            <h3>{pagewidth}</h3>
            <button className='btn btn-primary' onClick={()=> setCount(count + 1)}>Increment</button>
        </div>
    </div>
  )
}

export default Useeffect11;
