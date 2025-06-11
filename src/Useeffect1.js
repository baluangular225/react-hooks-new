import React, { useEffect, useState } from "react";
import Header from "./Components/Header";

const Useeffect1 = () => {
  const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  const [drinksData, setDrinksData] = useState([]);
  const [searchDrink, setSearchDrink] = useState("");
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({status: false, msg: ""});

  const fetchDrinks = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setLoading(true);
    setIsError({status: false, msg: ""});
    // ✅ Ensure we only set array values
    if (Array.isArray(data.drinks)) {
      setDrinksData(data.drinks);
      
    } else {
      setDrinksData([]);  // fallback to empty array
    }
    setLoading(false);
    setIsError({status: false, msg: ""});
    if(response.status === 404){
        throw new Error('Please enter a valid URL API 404');
    }

  } catch (error) {
    console.log("Fetch error:", error);
    setDrinksData([]); // fallback on error too
    setLoading(false);
    setIsError({status: true, msg: error.message || 'Something went wrong'});
  }
};

  useEffect(() => {
    const currectURL = `${URL}${searchDrink}`;
    fetchDrinks(currectURL);
  }, [searchDrink]);

  if(loading){
    return <h3 className="text-center mt-5" style={{color:'green'}}>Loading...</h3>
  }

  if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
  }

  return (
    <div>
      <Header/>
    <div className="container">
      <div className="shadow p-3 mt-3 mb-3">
        <h4 className="p-2 mb-2" style={{ color: "#0070ad" }}>Search Drinks</h4>
        <form>
          <input
            type="text"
            className="form-control"
            id="search"
            name="search"
            value={searchDrink}
            onChange={(e) => setSearchDrink(e.target.value)}
            placeholder="Search drinks"
          />
        </form>
      </div>

      <div className="row">
       {drinksData.length === 0 ? (
        <p className="text-center text-danger">Search your favorite drinks</p>
        ) : (
        drinksData.map((eachDrink) => {
            const { idDrink, strDrink, strDrinkThumb } = eachDrink;
            return (
            <div className="col-4 col-xs-12" key={idDrink}>
                <div className="shadow p-3 mt-2 mb-2">
                <p>{idDrink}</p>
                <img src={strDrinkThumb} className="img-fluid" alt={strDrink} />
                <h5 className="text-center" style={{ color: "#0070ad" }}>
                    {strDrink}
                </h5>
                </div>
            </div>
            );
        })
        )}

      </div>
    </div>
    </div>
  );
};

export default Useeffect1;
