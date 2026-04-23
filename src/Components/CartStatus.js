import React from 'react';
import { useSelector } from 'react-redux';

const CartStatus = (props) => {
  const products = useSelector((state) => state.productReducer?.productsData || []);
  const lastUpdated = useSelector((state) => state.productReducer?.lastUpdated || null);
  const mountId = props.mountId || 'unknown';

  console.log(`CartStatus(${mountId}) selector -> products:`, products, 'lastUpdated:', lastUpdated);

  if (products.length === 0) {
    return (
      <div className="text-center my-4">
          <img
            src="/logo192.png"
            alt="Empty cart"
            className="img-fluid mb-2"
            onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="100%" height="100%" fill="%2312abdb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16">Empty Cart</text></svg>'; }}
          />
          <p>Your cart is empty</p>
          <small className="text-muted">mount: {mountId}</small>
        </div>
    );
  }

  return (
    <div className="text-end my-2">
      <small>Items: {products.length} • Last updated: {lastUpdated}</small>
      <div>
        {products.map((p, i) => (
          <div key={i}>{p.productName} — {p.productPrice}</div>
        ))}
      </div>
      <small className="d-block text-muted">mount: {mountId}</small>
    </div>
  );
};

export default CartStatus;
