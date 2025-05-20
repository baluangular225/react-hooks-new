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
            loading:action.payload
        }
    }

    if(action.type === "ERROR"){
        return{
            ...state,
            isError:action.payload
        }
    }

    if(action.type === "DELETE_USER"){
        const userDelete = state.userData.filter(eachUser=> eachUser.id !== action.payload)
        return{
            ...state,
            userData:userDelete
        }
    }

    if(action.type === "Edit_USER"){
        return{
            ...state,
            isEditing:action.payload
        }
    }

    if(action.type === "UPDATE_USER"){
        const userUpdate = state.userData.map((eachUser)=>{
            if(eachUser.id === action.payload.id){
                return{
                    ...eachUser,
                    name:action.payload.name,
                    email:action.payload.email,
                    address: {
                    ...eachUser.address, // Preserve the rest of the address properties
                    city: action.payload.city // Update the city within the address
                }
                }
            }else{
                return eachUser
            }
        })
        return{
            ...state,
            userData:userUpdate
        }
    }

    return state;
}
const Usereducer2 = () =>{

    const URL='https://jsonplaceholder.typicode.com/users';

    const fetchAPI = async (apiUrl) =>{
        dispatch({type:'LOADING', payload:true});
        dispatch({type:'ERROR', payload:{status:false, msg:""}});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            dispatch({ type:'FETCH_DATA', payload:data });
            dispatch({type:'LOADING', payload:false});
            dispatch({type:'ERROR', payload:{status:false, msg:""}});
        } catch (error) {
            console.log("Fetch error:", error);
             dispatch({type:'LOADING', payload:false});
             dispatch({type:'ERROR', payload:{status:true, msg:error.message || "something went wrong"}});
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

    const handleUpdate = (id, name, email, city) =>{
        dispatch({type:'UPDATE_USER', payload:{status:true, id:id, name:name, email:email, city:city}});
        dispatch({type:"Edit_USER", payload:{status:false, id:'', name:'', email:'', city:''}});
    }

    const initinalState = {
        userData:[],
        loading:true,
        isError:{status:false, msg:""},
        isEditing:{status:false, id:'', name:'', email:'', address:''}
    };

    const [state, dispatch] = useReducer(reducer, initinalState);

    useEffect(()=>{
      fetchAPI(URL);
    },[])
    
    if(state.loading){
        return <h3 className="text-center mt-5" style={{color:'green'}}>Loading...</h3>
    }

    if(state.isError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{state.isError?.msg}</h3>
    }

    return(
        <div className="container">
            <h3 className="mt-3 mb-3" style={{color:'#12abdb'}}>Usereducer2</h3>

            {state.isEditing?.status && <Formlist id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingCity={state.isEditing.city} updateData={handleUpdate} />}

            <div className="row">
                {state.userData.map((eachUser)=>{
                    const {id, name, email, address} = eachUser;
                    const city = address?.city || "No City"; // Safe access to city
                    return(
                        <div key={id} className="col-4 col-xs-12">
                            <div className="shadow p-3 mt-3 mb-3">
                                <h6>{name}</h6>
                                <h6>{email}</h6>
                                <h6>{city}</h6>
                                <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                    <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                    <button className="btn btn-warning rounded-0" onClick={()=> dispatch({type:'Edit_USER', payload:{status:true, id:id, name:name, email, city}})}>Edit</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

const Formlist = ({ id, comingName, comingEmail, comingCity, updateData }) => {
    const [name, setName] = useState(comingName || '');
    const [email, setEmail] = useState(comingEmail || '');
    const [city, setCity] = useState(comingCity || '');
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page refresh

        // Check if any of the fields are empty
        if (!name || !email || !city) {
            setError("All fields are required!");
            return;
        }

        // If all fields are filled, proceed to update the user data
        setError("");  // Reset the error
        updateData(id, name, email, city);
    };

    return (
        <div className="shadow p-3">
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="submit"
                    className="btn btn-primary mb-2 rounded-0 justify-content-md-end"
                    value="Update"
                />
            </form>
        </div>
    );
};


export default Usereducer2;