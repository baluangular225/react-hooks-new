import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import loadingshop from "./../src/loadingshop.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsestateExp1 = () =>{

 const URL ="https://api.escuelajs.co/api/v1/products";

 const [myProducts, setMyProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState({status:false, msg:""});
 const [editId, setEditId] = useState(null);
 const [images, setImage] = useState('');
 const [title, setTitle] = useState('');
 const [price, setPrice] = useState('');
 const [showForm, setShowForm] = useState(false);

 const fetchApi = async (apiUrl) =>{
    setLoading(true);
    setError({status:false, msg:""});
     try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMyProducts(data);
        setLoading(false);
        setError({status:false, msg:""});
        if(response.status === 404){
            throw new Error('Please enter a valid URL API 404');
        }
     } catch (error) {
        console.log(error);
        setLoading(false);
        setError({status:true, msg:error.message || "something went wrong"});
     }
 }

 const handleDelete = async (id) =>{
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
            method:"DELETE",
            headers:{'Content-type' : 'Application/json'}
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Products not deleted');
        }
        setMyProducts(myProducts.filter(eachProducts=> eachProducts.id !== id))
        toast.error('Product deleted successfully');
    } catch (error) {
        console.log(error);
    }
 }

 const handleEdit = async (id, images, title, price) =>{

    setEditId(id);
    setImage(images?.[0] || "");  // Assume first image from array
    setTitle(title);
    setPrice(price);

    setShowForm(true);

     await fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
        method:"PUT",
        headers:{'Content-type' : 'Application/json'},
        body:JSON.stringify({images, title, price})
     })
     .then(response=>{
        if(response.ok){
            throw new Error('Product edited successfully');
        }
        toast.success('Product edited successfully')
     })
     
     .catch((error)=>{
        console.log(error);
     })
 }

 const handleSubmit = async () =>{

     const allData ={
        images,
        title,
        price
     }

     try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products`,{
            method:"POST",
            headers:{"Content-Type" : "Application/json"},
            body:JSON.stringify(allData)
        })
        if(response.ok){
            const data = await response.json();
            throw new Error(data.message || "Product added successfully");
        }
        const UPDATEDATA = myProducts.map((eachProduct)=>{
            if(eachProduct.id === editId){
                return {...eachProduct, ...allData}
            }
            else{
                return eachProduct
            }
        })
        setMyProducts(UPDATEDATA);
        setEditId(null);
        setImage('');
        setTitle('');
        setPrice('');
        setShowForm(false);
        toast.success('Product Update successfully');
     } catch (error) {
        toast.error('Product Update Unsuccessfully');
     }
 }

 useEffect(()=>{
    fetchApi(URL)
 },[])

 if(loading){
    return <p className="mt-5 text-center"><img src={loadingshop} alt={loadingshop} width={350} /></p>
 }

 if(error?.status){
    return <p className="text-danger mt-5">{error?.msg}</p>
 }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h4 className="mt-3 mb-3">Total Products {myProducts.length}</h4>

                   {showForm && 
                   <div className="mt-3 shadow p-3">
                       <input type="text" className="form-control mb-2" value={images} onChange={(e) => setImage(e.target.value)} />
                        <input type="text" className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                         <input type="text" className="form-control mb-2" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <button className="btn btn-primary" onClick={()=> handleSubmit(editId)}>Submit</button>
                   </div>
                   }

                   <div className="row">
                      {myProducts.map((eachProducts)=>{
                         const {id,title,images,price} = eachProducts;
                         return(
                            <div key={id} className="col-3 col-xs-12">
                                <div className="shadow p-3 mb-2 text-center">
                                    <img
                                        src={images}
                                        className="card-img-top"
                                        alt={title}
                                        style={{ height: '250px', objectFit: 'contain' }}
                                        />
                                    <p>{title}</p>
                                    <p>{price}</p>
                                    <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, images, title, price)}>Edit</button>
                                     </div>
                                </div>
                                
                            </div>
                         )
                      })}
                   </div>

               </div>
                <ToastContainer position="top-right" autoClose={3000} />
            <Footer/>
        </div>
    )
}

export default UsestateExp1;
