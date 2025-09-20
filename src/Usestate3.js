import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Components/Footer";

const Usestate3 = () => {
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

    // Simulate uploading the image and returning a URL
    // Image upload removed. Now using direct image URL input.

    const fetchApi = async (apiUrl) => {
        setIsLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setMyProducts(data);
            setIsLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('API 404 Error');
            }
        } catch (error) {
            console.log(error);
            setIsError({ status: true, msg: 'Failed to load data' });
            setIsLoading(false);
            setIsError({status:true, msg: error.message || 'something went wrong'});
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json'
                }
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Product Delete');
            }
            setMyProducts(myProducts.filter(eachProduct => eachProduct.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id, title, description, images, price) => {
        setEditId(id);
        setTitle(title);
        setDescription(description);
        setImages(images);
        setPrice(price);
    setShowModal(true);
    };

    const Updateroducts = async () => {
    // Use the image URL directly from input
    const updatedProduct = {
        title,
        description,
        price,
        images: [images]
    };

    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API error response:', errorData);
            setIsError({ status: true, msg: errorData.message || 'Failed to update product' });
            return;
        }

        const newProduct = await response.json();
        const updatedProducts = myProducts.map((eachProduct) =>
            eachProduct.id === editId ? { ...eachProduct, ...newProduct } : eachProduct
        );
        setMyProducts(updatedProducts);
        setEditId(null);
        setTitle('');
        setDescription('');
        setImages('');
        setPrice('');
        setIsError({ status: false, msg: '' });
    setShowModal(false);
    } catch (error) {
        console.log('Error updating product:', error);
        setIsError({ status: true, msg: error.message || 'Failed to update product' });
    }
};


    useEffect(() => {
        fetchApi(URL);
    }, []);

    if (isLoading) {
        return <p className="mt-5 text-center">Loading Data Products</p>;
    }

    if (isError?.status) {
        return <p className="mt-5 text-center text-danger">{isError?.msg}</p>;
    }

    return (
        <div>
            <Header />
            <div className="container">
                <h4 className="mt-3 mb-3">{myProducts.length} &nbsp;Usestate3</h4>

                {/* Bootstrap Modal for Edit Form */}
                <div className={`modal fade${showModal ? ' show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ background: showModal ? 'rgba(0,0,0,0.5)' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Product</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-2" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                                <input type="text" className="form-control mb-2" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                                <input type="text" className="form-control mb-2" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                                <input type="text" className="form-control mb-2" name="images" value={images} onChange={(e) => setImages(e.target.value)} placeholder="Image URL" />
                                {images && (
                                    <div>
                                        <img src={images} alt="Product" className="img-fluid" style={{ maxWidth: '100px', marginBottom: '10px' }} />
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => Updateroducts()}>Update Product</button>
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {myProducts.map((eachProduct) => {
                        const { id, title, description, images, price } = eachProduct;
                        return (
                            <div key={id} className="col-12 col-md-4 mb-4 d-flex align-items-stretch">
                                <div className="shadow p-3 w-100" style={{ minHeight: '400px', maxHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <p className="fw-bold text-center">{title}</p>
                                    <img src={images} className="card-img-top mx-auto" alt={title} style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
                                    <p className="text-center card-desc" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        minHeight: '3em'
                                    }}>{description}</p>
                                    <p className="text-center">{price}</p>
                                    <div className="d-grid d-md-flex justify-content-md-end mt-auto">
                                        <button className="btn btn-danger rounded-0 me-2" onClick={() => handleDelete(id)}>Delete</button>
                                        <button className="btn btn-primary rounded-0" onClick={() => handleEdit(id, title, description, images, price)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Usestate3;
