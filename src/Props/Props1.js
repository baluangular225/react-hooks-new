import React from "react";

const Props1 = () =>{

   const arrayObj=[
      {
        Title:"Dhurandhar",
        imgURL:"https://occ-0-2040-2186.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABYWfklg5D5btQoekHBjGHSFXDW_EezXrT97RnSaEwirkVnCt91QaQlcPWCxtfkSrW04hOcHguRrAMgyKTJzs2_PKkFkbs60DHC4.webp?r=05f"
        },
        {
        Title:"Accused",
        imgURL:"https://occ-0-2040-2186.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABaVDq0boUdBkElTZG4culjGTQKUH6_QEiKg4MkhBHrrWU3QPykbrke0wv0VyP_6P-rH5M_vB9uafNA39o8feH37ZlhoH9zimxu5ZLH7T0R0c0vQpHbF_NQCOWI-OdPWAy7b4.webp?r=1fe"
        },
        {
        Title:"Taskaree",
        imgURL:"https://occ-0-2040-2186.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABTk_B0l_BvDJ7CQuWOAax9ZKSAe65vFGUMjAee8pcvuYXDFDvcnFaF8nOEuwxBg-TFKzHTqhdD3D7zlMsXSpA_BQTHf-ouBVNdwJIJvNQzUGje4WVrnptKL5Ywqu9hV7pg3A.webp?r=f34"
        }
   ]    

    return(
        <div className="container">
            {/* <Movies Title={arrayObj[0].Title} imgURL={arrayObj[0].imgURL}/>
            <Movies Title={arrayObj[1].Title} imgURL={arrayObj[1].imgURL}/>
            <Movies Title={arrayObj[2].Title} imgURL={arrayObj[2].imgURL}/> */}
            <div className="row">
            {arrayObj.map((eachMovie,index)=>{
                const {Title,imgURL,description} = eachMovie;
               return <Movies key={index} Title={Title} imgURL={imgURL} description={description} />
            })}
            </div>
        </div>
    )

}

const Movies = (props) => {
      const {Title,imgURL,description} = props;
      return(
        <div className="col-4 col-xs-12">
            <div className="shadow text-center mt-4 p-3 mb-3">
                <h5 className="card-title">{Title || "Title not found"}</h5>
                <img src={imgURL} alt={Title || "Sample"} className="img-fluid" />
                <p className="card-text">{description || "Description not found"}</p>
            </div>
        </div>
      )
}


export default Props1;