 import React from 'react';

 const Buttons = ({children, clickHandler}) =>{
     console.log(`${children} rendered`);
     return <button className='btn btn-primary' onClick={clickHandler}>{children}</button>;
 }

 export default React.memo(Buttons);