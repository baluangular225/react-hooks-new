import React, { useCallback, useState } from 'react'
import Count from '../src/Callback/Count';
import Buttons from '../src/Callback/Buttons';
import Title from '../src/Callback/Title';


const Parentcallback1 = () => {

    const [age, setAge] = useState(0);
    const [salary, setSalary] = useState(50000)

    const incrementAge = useCallback(() =>{
        setAge(age + 1)
    },[age])

    // const incrementAge = () =>{
    //     setAge(age + 1)
    // }

    const incrementSalary = useCallback(
        () =>{
        setSalary(salary + 1000)
    },[salary])

  return (
    <div className='container'>
        <Title />
        <Count title='Age' number={age} />
        <Buttons clickHandler={incrementAge}>Increment Age</Buttons>
        <Count title='Salary' number={salary} />
        <Buttons clickHandler={incrementSalary}>Increment Salary</Buttons>
    </div>
  )
}

export default Parentcallback1;
