import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Components/Footer";
import { Link, NavLink } from "react-router-dom";

const Usestate4 = () => {
  const [showModal, setShowModal] = useState(false);
  const URL = "https://api.escuelajs.co/api/v1/products";

  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: '' });
  const [editId, setEditId] = useState(null);
  const [images, setImages] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);

  // Fetch products
  const fetchApi = async (apiUrl) => {
    setIsLoading(true);
    setIsError({ status: false, msg: '' });
    try {
      const response = await fetch(apiUrl);
      if (response.status === 404) throw new Error('API 404 Error');
      const data = await response.json();
      setMyProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError({ status: true, msg: error.message || 'Failed to load data' });
      setIsLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Product delete failed');
      }
      setMyProducts(myProducts.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Edit product - prefill modal
  const handleEdit = (id, title, description, images, price, category) => {
    setEditId(id);
    setTitle(title);
    setDescription(description);
    setImages(images?.[0] || ''); // use first image if exists
    setPrice(price);
    setCategoryId(category?.id || 1);
    setShowModal(true);
  };

  // Normalize URL: add https:// if missing
  const normalizeUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return 'https://' + url;
  };

  // Validate URL (simple check)
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Update product
  const Updateroducts = async () => {
    const normalizedImageUrl = normalizeUrl(images.trim());

    if (!isValidUrl(normalizedImageUrl)) {
      setIsError({ status: true, msg: 'Invalid image URL' });
      return;
    }

    const updatedProduct = {
      title,
      description,
      price: Number(price),
      images: [normalizedImageUrl],
      categoryId: Number(categoryId)
    };

    try {
      const response = await fetch(`${URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        setIsError({ status: true, msg: errorData.message?.[0] || 'Failed to update product' });
        return;
      }

      const newProduct = await response.json();
      const updatedProducts = myProducts.map((product) =>
        product.id === editId ? { ...product, ...newProduct } : product
      );
      setMyProducts(updatedProducts);

      // Reset form
      setEditId(null);
      setTitle('');
      setDescription('');
      setImages('');
      setPrice('');
      setShowModal(false);
      setIsError({ status: false, msg: '' });

    } catch (error) {
      console.log('Error updating product:', error);
      setIsError({ status: true, msg: error.message || 'Failed to update product' });
    }
  };

  useEffect(() => {
    fetchApi(URL);
  }, []);

  if (isLoading) return <p className="mt-5 text-center">Loading Data Products...</p>;
  if (isError.status && !showModal) return <p className="mt-5 text-center text-danger">{isError.msg}</p>;

  return (
    <div>
      <Header />
      <div className="container">
        <h4 className="mt-3 mb-3">{myProducts.length} &nbsp;Usestate4</h4>

        {/* Modal */}
        <div className={`modal fade${showModal ? ' show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ background: showModal ? 'rgba(0,0,0,0.5)' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input type="text" className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input type="text" className="form-control mb-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                <input type="text" className="form-control mb-2" value={images} onChange={(e) => setImages(e.target.value)} placeholder="Image URL" />
                {images && <img src={normalizeUrl(images)} alt="Preview" className="img-fluid" style={{ maxWidth: '100px', marginBottom: '10px' }} />}
                {isError.status && <p className="text-danger">{isError.msg}</p>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={Updateroducts(editId)}>Update Product</button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="row">
          {myProducts.map(({ id, title, description, images, price, category }) => (
            <div key={id} className="col-12 col-md-4 mb-4 d-flex align-items-stretch">
              <div className="shadow p-3 w-100" style={{ minHeight: '400px', maxHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p className="fw-bold text-center">{title}</p>
                <img src={images?.[0]} className="card-img-top mx-auto" alt={title} style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
                <p className="text-center card-desc" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minHeight: '3em'
                }}>{description}</p>
                <p className="text-center">${price}</p>
                <div className="d-grid d-md-flex justify-content-md-end mt-auto">
                  <button className="btn btn-danger rounded-0" onClick={() => handleDelete(id)}>Delete</button>
                  <button className="btn btn-primary rounded-0" onClick={() => handleEdit(id, title, description, images, price, category)}>Edit</button>
                  <NavLink className="btn btn-info rounded-0" to={`/Usestate3/${id}`}>View Details</NavLink>
                  <Link className="btn btn-warning rounded-0" to={`/usepost3`}>Add Post</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Usestate4;
