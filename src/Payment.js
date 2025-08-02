import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { clearCart, remove } from './Redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const cartProducts = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const totalPrice = cartProducts.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
  localStorage.setItem("lastOrder", JSON.stringify(cartProducts));
  dispatch(clearCart());
  navigate('/SuccessPayment');
};


  const handleDelete = (id) => {
    dispatch(remove(id));
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">Payment Summary</h2>

        {cartProducts.length === 0 ? (
          <div className="alert alert-info text-center">Your cart is empty.</div>
        ) : (
          <>
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                 {cartProducts.map((item) => {
                    const { id, title, price } = item;
                    return (
                    <tr key={id}>
                        <td>{title}</td>
                        <td>₹ {price.toFixed(2)}</td>
                        <td>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    );
                })}
                <tr>
                    <td className="fw-bold text-end" colSpan={2}>
                    Total:
                    </td>
                    <td className="fw-bold">₹ {totalPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-end">
              <button className="btn btn-success" onClick={handlePayment}>
                Confirm & Pay ₹ {totalPrice.toFixed(2)}
             </button>

            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
