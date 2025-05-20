import React,{useReducer} from 'react';

const reducer = (state, action) =>{
    // console.log(action);//{type:"DELETE_USER", payload:1}
    // console.log(state);//{data:[], length:0}
   if(action.type === "DELETE_USER"){
      const deletePerson = state.data.filter(eachData => {
        return eachData.id !== action.payload
      })
      return{
        ...state,
        data:deletePerson,
        length:deletePerson.length-1
      }
   }
}

const Usereducer1 = () => {

const initialState = {
    data:[
        {id:1, name:"Pawan", email:"pawan@example.com"},
        {id:2, name:"Balu", email:"balu@example.com"},
        {id:3, name:"react", email:"react@example.com"},
    ]
}

const [state, dispatch] = useReducer(reducer, initialState);

const handleDelete = (id) =>{
    // console.log(id);
    dispatch({
        type:'DELETE_USER',
        payload:id
    })
}

  return (
    <div className='container '>
        <h5 className='mt-3'>Users List length: {state.data.length}</h5>

        <div className='row'>
            {state.data.map((eachData)=>{
                const {id, name, email} = eachData;
                return<div key={id} className='col-4 col-xs-12'>
                    <div className='shadow p-3 mt-3 mb-3'>
                        <h5>{name}</h5>
                        <p>{email}</p>
                        <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                    </div>
                </div>
            })}
        </div>

    </div>
  )
}

export default Usereducer1
