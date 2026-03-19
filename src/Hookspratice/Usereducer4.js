import React, { useReducer } from 'react'

const reducer = (state, action) =>{
   if(action.type === 'DELETE_USER'){
      const DeleteUser = state.data.filter((eachUser) =>{
        return eachUser.id !== action.payload
      })
       console.log("DeleteUser", DeleteUser);
      return { ...state, data: DeleteUser }
      
   }

}

const Usereducer4 = () => {

    const initialState = {
        data:[
            {id:1, name:"John", email:"john@example.com"},
            {id:2, name:"pawan", email:"pawan@example.com"},
        ]
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDelete = (id) =>{
        dispatch({type:'DELETE_USER', payload:id})
    }

  return (
    <div>
         <div className='container'>
            <h2 className='mb-4 mt-4'>UseReducer Hook</h2>

            <div className='row'>
                {state.data.map(({id, name, email}) => (
                    <div key={id} className='col-md-4'>
                        <div className='card mb-3 shadow p-3'>
                            <div className='card-body'>
                                <h5 className='card-title'>{name}</h5>
                                <p className='card-text'>{email}</p>
                                <button className='btn btn-danger' onClick={()=> handleDelete(id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

         </div>
    </div>
  )
}

export default Usereducer4;
