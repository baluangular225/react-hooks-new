// import react from "react";

import { useDispatch, useSelector } from "react-redux"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import { increment } from "./Redux/counterSlice";
import UserForm from "./UserForm";


const Usestate1 = () => {

    const message = useSelector((state) => state.user.message);

    const dispatch = useDispatch();

    const handleIncrment = () =>{
        dispatch(increment())
    }
    
    return(
        <div>
            <Header/>
            <div className="container">
               <h1>Usestate1</h1>
               <button className="btn btn-primary" onClick={handleIncrment}>add value</button>

                <div className="shadow p-3">
                <h2>Submitted Message:</h2>
                <p>{message}</p>
                </div>

               <UserForm/>
            </div>
            <Footer/>
        </div>
    )
}

export default Usestate1