import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPayment = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-success">Payment Successful ✅</h1>
      <p>Your order has been placed!</p>
      <Link to="/Products" className="btn btn-primary mt-3">Go to Home</Link>
    </div>
  );
};

export default SuccessPayment;
