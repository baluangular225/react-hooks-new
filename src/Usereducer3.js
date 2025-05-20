import React, { useEffect, useReducer, useState } from "react";

const reducer = (state, action) =>{

    if(action.type === "FETCH_DATA"){
        return{
            ...state,
            userData:action.payload
        }
    }

    if(action.type === "LOADING"){
        return{
            ...state,
            isLoading:action.payload
        }
    }

    if(action.type === "ERROR"){
        return{
            ...state,
            isError:action.payload
        }
    }

    if(action.type === "DELETE_USER"){
        const userDelete = state.userData.filter(eachData=> eachData.id !== action.payload)
        return{
            ...state,
            userData:userDelete
        }
    }

    if(action.type === "EDIT_USER"){
        return{
            ...state,
            isEditing:action.payload
        }
    }

    if(action.type === "UPDATE_USER"){
        const userUpdate = state.userData.map((eachData)=>{
            if(eachData.id === action.payload.id){
                return{
                    ...eachData,
                    name:action.payload.name,
                    email:action.payload.email,
                    address:{
                        ...eachData.address,
                        city:action.payload.city
                    }
                }
            }else{
                return eachData
            }
        })
        return{
            ...state,
            userData:userUpdate
        }
    }

    return state;
}

const Usereducer3 = () =>{

    const newStyles = {color:"green"}

    const URL="https://jsonplaceholder.typicode.com/users";

    const fetchApi = async (apiUrl)=>{
        dispatch({type:'LOADING', payload:true});
        dispatch({type:'ERROR', payload:{status:false, msg:""}});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            dispatch({type:'FETCH_DATA', payload:data});
            dispatch({type:'LOADING', payload:false});
            dispatch({type:'ERROR', payload:{status:false, msg:""}});
        } catch (error) {
            console.log(error);
            dispatch({type:'LOADING', payload:false});
            dispatch({type:'ERROR', payload:{status:true, msg:"Something went wrong"}});
        }
    }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE',
                headers:{'Content-Type':'application/json'}
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Something went wrong');
            }
            dispatch({type:'DELETE_USER', payload:id});
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = (id, name, email, city) =>{
       dispatch({type:'UPDATE_USER', payload:{status:true, id:id, name:name, email:email, city:city}});
       dispatch({type:'EDIT_USER', payload:{status:false, id:'', name:'', email:'', city:''}})
    }

   const initialState ={
      userData:[],
      isLoading:false,
      isError:{status:false, msg:""},
      isEditing:{status:false, id:'', name:'', email:'', city:''}
   }

   const [state, dispatch] = useReducer(reducer, initialState);

     useEffect(()=>{
        fetchApi(URL)
    },[])
    

    if(state.isLoading){
        return <h3 className="text-center mt-5" style={newStyles}>Loading Data...</h3>
    }

    if(state.isError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{state.isError?.msg}</h3>
    }

    return(
        <div className="container">
            <h3 className="mt-3" style={newStyles}>Usereducer3 Component</h3>

            {state.isEditing?.status && <Formlist id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingCity={state.isEditing.city} updateData={updateData} />}

            <div className="row mt-4">
                {state.userData.map((eachData)=>{
                    const {id, name, email, address} = eachData;
                    const city = address?.city || "No City"; // Safe access to city
                    return(
                        <div key={id} className="col-4 col-xs-12">
                            <div className="shadow p-3">
                                <p>{name}</p>
                                <p>{email}</p>
                                <p>{city}</p>
                                <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                    <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                    <button className="btn btn-primary rounded-0" onClick={()=> dispatch({type:'EDIT_USER', payload:{status:true, id, name, email, city}})} >Edit</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const Formlist = ({id, comingName, comingEmail, comingCity, updateData}) =>{

   const [name, setName] = useState(comingName || '');
   const [email, setEmail] = useState(comingEmail || '');
   const [city, setCity] = useState(comingCity || '');
   const [error, setError] = useState('');

   const formSubmit = async (e) =>{
      e.preventDefault();

      if(!name || !email || !city){
          setError("All fields are required!");
          return
      }

      setError('');
      updateData(id, name, email, city);
   }

    return(
        <div className="container">
            <div className="shadow p-3">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={formSubmit}>
                <input type="text" className="form-control mb-2" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="email" className="form-control mb-2" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" value={city} onChange={(e)=> setCity(e.target.value)} />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Usereducer3;