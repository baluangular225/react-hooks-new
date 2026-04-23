import React from 'react'
import { MobileData } from '../Data1';
import { useDispatch, useSelector } from 'react-redux';
import { incrementProduct, decrementProduct } from '../Redux/productSlice';
import Header from '../Components/Header';

const Mobileproducts = () => {

  const mobileProducts = MobileData;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer?.productsData || []);
  const lastUpdated = useSelector((state) => state.productReducer?.lastUpdated || null);

  console.log('Mobileproducts selector -> products:', products, 'lastUpdated:', lastUpdated);


  return (
    <div>
      <Header />
        <div className='container'>
            <h2 className='mb-4 mt-4'>Mobile Products</h2>

             <div className='row'>
                 {mobileProducts.map((eachMobile) => {
                    const { id, name, url, price } = eachMobile;
                    return (
                      <div className='col-12 col-md-4 text-center' key={id}>
                        <div className='card mb-4 p-3'>
                          <h3>{name}</h3>
                          <img src={url} alt={name} className='img-fluid' />
                          <p>{price}</p>

                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-primary rounded-0" onClick={() => dispatch(incrementProduct({
                                productName: name,
                                productPrice: price
                            }))}>Add</button>
                            <button className="btn btn-danger rounded-0" onClick={() => dispatch(decrementProduct({
                                productName: name,
                                productPrice: price
                            }))}>Remove</button>
                          </div>

                        </div>
                        
                      </div>
                    );
                 })}
             </div>

        </div>
    </div>
  )
}

export default Mobileproducts;
