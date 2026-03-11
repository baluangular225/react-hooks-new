import React, { useEffect, useState } from 'react'

const Useeffect13 = () => {

    const URL="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    const [newDrinks, setNewDrinks] = useState([]);
    const [searchDrink, setSearchDrink] = useState('');
     const [error, setError] = useState({status:false, msg:''});
     const [loading, setLoading] = useState(false);

    const fetchDrinks = async (apiUrl) =>{
        setLoading(true);
        setError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const {drinks} = await response.json();
            setNewDrinks(Array.isArray(drinks) ? drinks : []);
            console.log(drinks);
            setLoading(false);
            setError({status:false, msg:''});
            if(!drinks || drinks.length === 0){
                throw new Error('Drinks not found');
            }
        } catch (error) {
            console.error('Error fetching drinks data:', error);
            setLoading(false);
            setError({status:true, msg:error.message || 'Failed to fetch drinks data'});
        }
    }

    useEffect(()=>{
      const searchUrl = `${URL}${searchDrink}`
      fetchDrinks(searchUrl)
    }, [searchDrink])

        if(loading){
            return <h5 className='text-center mt-5' style={{color:'green'}}>Loading...</h5>
        }
        if(error.status){
            return <h5 className='text-center mt-5' style={{color:'red'}}>{error.msg}</h5>
        }

  return (
    <div>
        <div className='container'>
            <h2 className='mb-4 mt-4'>UseEffect Hook</h2>

            <form>
                <input type='text' className='form-control' placeholder='Search for drinks...' value={searchDrink} onChange={(e)=> setSearchDrink(e.target.value)} />
            </form>

            <div className='row'>
                {Array.isArray(newDrinks) && newDrinks.map((eachDrink)=>{
                    const {idDrink, strDrink, strDrinkThumb} = eachDrink;
                    return(
                        <div key={idDrink} className='col-12 col-md-4'>
                            <div className='card mb-4'>
                                <div className='card-body'>
                                    <img src={strDrinkThumb} className='card-img-top' alt={strDrink} />
                                    <h5 className='card-title text-center' style={{color:'green'}}>{strDrink}</h5>
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

export default Useeffect13;
