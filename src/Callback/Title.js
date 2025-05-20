import React from 'react';

 const Title = () =>{
    console.log('Title rendered');
    return <h3 className='mt-3 mb-3'>Callback & React.memo</h3>;
 }
 
 export default React.memo(Title);