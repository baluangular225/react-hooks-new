import React from "react";

const Usecontext1 = () =>{

    const [userDetails, setUserDetails] = React.useState({
        name : 'Pawan Balla',
        age : 30,
        mail: 'pawan@example.com'
    })

    return(
        <div>
            <h1>Usecontext1</h1>
            <Usecontext2 userDetails={userDetails} />
        </div>
    )
}

const Usecontext2 = (props) =>{
    console.log(props)
    return(
        <div>
            <h1>Usecontext2</h1>
            <Usecontext3 userDetails={props.userDetails} />
        </div>
    )
}

const Usecontext3 = ({userDetails}) =>{
    console.log(userDetails)
    return(
        <div>
            <h1>Usecontext3</h1>
            <h2>{userDetails.name}</h2>
            <h2>{userDetails.age}</h2>
            <h2>{userDetails.mail}</h2>
        </div>
    )
}

export default Usecontext1;