import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from './Redux/cartSlice';
import emptycart from '../src/empty_cart.gif';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartProducts = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(remove(id));
  };

  const totalPrice = cartProducts.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div>
      <Header />
      <div className='container'>
        <h3 className='mt-3 mb-4' style={{ color: 'green' }}>Cart Products</h3>

        <div className="row g-4">
          {cartProducts.length === 0 ? (
            <div className="col-12 text-center">
              <img src={emptycart} className='img-fluid' width={550} alt="empty cart" />
            </div>
          ) : (
            <>
              {cartProducts.map((eachProduct) => {
                const { id, title, images, description, price } = eachProduct;
                return (
                  <div className="col-12 col-md-4" key={id}>
                    <div className="card h-100 shadow text-center">
                      <img
                        src={Array.isArray(images) ? images[0] : images}
                        className="card-img-top"
                        alt={title}
                        style={{ height: '250px', objectFit: 'contain' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text text-success fw-bold">₹ {price.toFixed(2)}</p>
                        <p className="card-text" style={{ flexGrow: 1 }}>
                          {description?.length > 100
                            ? description.substring(0, 100) + '...'
                            : description}
                        </p>
                        <button className="btn btn-danger mt-auto" onClick={() => handleDelete(id)}>Delete Item</button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Total Price + Checkout */}
              <div className="col-12 mt-4 mb-5">
                <div className="p-3 border shadow rounded text-end">
                  <h5>Total Price: ₹ {totalPrice.toFixed(2)}</h5>
                  <button className="btn btn-success mt-2" onClick={handleCheckout}>
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
