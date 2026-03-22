import React, { useEffect, useReducer, useState } from 'react'

const reducer = (state, action) =>{

    if(action.type === "SET_USER_DATA"){
        return{
            ...state,
            userData: action.payload
        }
    }

    if(action.type === "DELETE_USER"){
        const DeleteUser = state.userData.filter((eachUser) =>{
          return eachUser.id !== action.payload
        }
        )
         console.log("DeleteUser", DeleteUser);
        return {
             ...state,
              userData: DeleteUser 
            }
    }

    if(action.type === "SET_LOADING"){
        return{
            ...state,
            isLoading: action.payload
        }
    }

    if(action.type === "SET_EDITING"){
        return{
            ...state,
            isEditing: action.payload
        }
    }

    if(action.type === "USER_UPDATE"){
        const updateUserData = state.userData.map((eachUser)=>{
            if(eachUser.id === action.payload.id){
                return {
                    ...eachUser,
                     name: action.payload.name,
                     email: action.payload.email,
                    website: action.payload.website
                }
            }else{
                return eachUser;
            }
            
        })
        return {
            ...state,
            userData: updateUserData
        }
    }

    return state;
}

const Usereducer5 = () => {

 const fetchApiData = async (apiUrl) =>{
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'ERROR', payload: false });
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch({ type: 'SET_USER_DATA', payload: data });
        console.log("data", data);
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'ERROR', payload: false });
    } catch (error) {
        console.error("Error fetching API data:", error);
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'ERROR', payload: true });
    }
 }

 const handleDelete = (id) =>{
    dispatch({type:'DELETE_USER', payload:id})
 }

 const updateData = (id, name, email, website) =>{
    dispatch({type:'USER_UPDATE', payload:{id, name, email, website}})
    dispatch({type:'SET_EDITING', payload:{status:false, id:'', name:'', email:'', website:''}})
 }


 useEffect(()=>{
    fetchApiData('https://jsonplaceholder.typicode.com/users')
 }, [])

 const initialState = {
     userData:[],
     error:{status:false, msg:""},
     isLoading:true,
     isEditing:{status:false, id:'', name:'', email:'', website:''}
 }

 const [state, dispatch] = useReducer(reducer, initialState);

 if(state.isLoading){
    return <div>
        <h2 className='text-center mt-5' style={{color:'lavender'}}>Userreducer5 Loading...</h2>
    </div>
 }

  return (
    <div>
       <div className='container'>
            <h2 className='mb-4 mt-4'>UseReducer5 Hook</h2>

            {state.isEditing?.status && (
                <Formcontainer
                    id={state.isEditing.id}
                    comingTitle={state.isEditing.name}
                    comingEmail={state.isEditing.email}
                    comingWebsite={state.isEditing.website}
                        updateData={updateData}
                />
            )}

            <div className='row'>
                {state.userData.map((eachUser)=>{
                    const {id, name, email, website} = eachUser;
                    return(
                        <div key={id} className='col-12 col-md-4'>
                            <div className='card mb-3 shadow p-3'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{name}</h5>
                                    <p className='card-text'>{email}</p>
                                    <p className='card-text'>{website}</p>
                                    <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                    <button className='btn btn-success rounded-0' onClick={()=> dispatch({type:'SET_EDITING', payload:{status:true, id, name, email, website}})}>Edit</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
       </div>
    </div>
  )
}


const Formcontainer = ({id, comingTitle, comingEmail, comingWebsite, updateData}) => {

  const [name, setName] = useState(comingTitle || '');
  const [email, setEmail] = useState(comingEmail || '');
  const [website, setWebsite] = useState(comingWebsite || '');
  const [error, setError] = useState('');

    useEffect(()=>{
        setName(comingTitle || '');
        setEmail(comingEmail || '');
        setWebsite(comingWebsite || '');
    }, [comingTitle, comingEmail, comingWebsite])

   const formSubmit = async (e) =>{
      e.preventDefault();

      if(!name || !email || !website){
          setError("All fields are required!");
          return
      }

      setError('');
      updateData(id, name, email, website);
   }

  return (
    <>
    <div className='shadow p-3 mb-3 mt-3'>
         {error && <div className="alert alert-danger">{error}</div>}
       <form onSubmit={formSubmit}>
           <input type="text" className='form-control mb-3' value={name} onChange={(e) => setName(e.target.value)} />
           <input type="email" className='form-control mb-3' value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type="text" className='form-control mb-3' value={website} onChange={(e) => setWebsite(e.target.value)} />
           <button type="submit" className="btn btn-primary">Submit</button>
       </form>
       </div>
    </>
  )
}



export default Usereducer5;
