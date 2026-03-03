import React from "react";

const Events1 = () =>{

//   const handleClick = () =>{
//     console.log("Button clicked!");
//   }

//   const handleClick = (e) =>{
//     console.log(e);
//   }

//   function clickHandle(e){
//     console.log("Button clicked!", e);
//   }

   function handleClick(e, firstName){
     console.log("Button Clicked!", e, firstName)
   }

    return(
        <div>
            <div className="container">
                <h3>Events1</h3>
                {/* <button className="btn btn-primary rounded-0" onMouseLeave={handleClick}>Click Me</button>

                <button className="btn btn-success rounded-0" onClick={clickHandle} >Click Here</button>
                 <button className="btn btn-warning rounded-0" onClick={function(e){
                    console.log("Button clicked1", e);
                 }} >Click Here1</button> */}

                  {/* <button className="btn btn-primary rounded-0" onClick={function(e){
                     return handleClick(e, "Pawan Balla")
                  }}>Click Me</button> */}

                   <button className="btn btn-primary rounded-0" onClick={(e)=> handleClick(e, "Pawan Balla")}>Click Me</button>

            </div>
        </div>
    )
}

export default Events1;