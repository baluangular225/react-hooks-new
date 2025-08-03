import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { clearCart, remove, increaseQuantity, decreaseQuantity } from './Redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const cartProducts = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate subtotal, GST, and final total
  const subtotal = cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
  const gstRate = 0.05;
  const gstAmount = subtotal * gstRate;
  const finalTotal = subtotal + gstAmount;

  const handlePayment = () => {
    const orderSummary = {
      items: cartProducts,
      subtotal,
      gst: gstAmount,
      total: finalTotal,
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderSummary));
    dispatch(clearCart());
    navigate('/SuccessPayment');
  };

  const handleDelete = (id) => {
    dispatch(remove(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
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
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map(({ id, title, price, quantity }) => (
                  <tr key={id}>
                    <td>{title}</td>
                    <td>₹ {price.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => handleDecrease(id)}
                      >−</button>
                      {quantity}
                      <button
                        className="btn btn-sm btn-outline-secondary ms-1"
                        onClick={() => handleIncrease(id)}
                      >+</button>
                    </td>
                    <td>₹ {(price * quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Payment Breakdown */}
                <tr>
                  <td colSpan={3} className="fw-bold text-end">Subtotal:</td>
                  <td className="fw-bold">₹ {subtotal.toFixed(2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={3} className="fw-bold text-end">GST (5%):</td>
                  <td className="fw-bold">₹ {gstAmount.toFixed(2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={3} className="fw-bold text-end">Total with GST:</td>
                  <td className="fw-bold">₹ {finalTotal.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <div className="text-end">
              <button className="btn btn-success" onClick={handlePayment}>
                Confirm & Pay ₹ {finalTotal.toFixed(2)}
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
