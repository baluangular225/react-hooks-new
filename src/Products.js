import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useDispatch } from "react-redux";
import { add } from "./Redux/cartSlice";

const Products = () =>{

  const [products, setProducts] = useState([]);
  const URL="https://api.escuelajs.co/api/v1/products";

  const dispatch = useDispatch();

  const handleCart = (eachProduct) =>{
      dispatch(add(eachProduct));
  }

  const fetchProducts = async (apiUrl) =>{
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
     fetchProducts(URL)
  },[])

    return(
        <div>
            <Header/>
                <div className="container">
                    <h1>Products</h1>
                      <div className="row g-4">
                        {products.map((eachProduct) => {
                        const { id, title, images, description,price } = eachProduct;
                        return (
                            <div className="col-12 col-md-3" key={id}>
                            <div className="card h-100 shadow text-center"> {/* h-100 ensures equal height */}
                                <img
                                src={images}
                                className="card-img-top"
                                alt={title}
                                style={{ height: '250px', objectFit: 'contain' }}
                                />
                                <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{title}</h5>
                                  <p className="card-text text-success fw-bold">₹ {price}</p>
                                <p className="card-text" style={{ flexGrow: 1 }}>
                                    {description.length > 100 ? description.substring(0, 100) + '...' : description}
                                </p>
                                <button className="btn btn-primary mt-auto" onClick={()=> handleCart(eachProduct)}>Add to Cart</button>
                                </div>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Products;