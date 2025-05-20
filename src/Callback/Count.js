 import React from 'react'
 
 const Count = ({title, number}) =>{
      console.log(`${title} rendered`);
     return <h5>{title} : {number}</h5>;
 }
 export default React.memo(Count);