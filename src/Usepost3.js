import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Usepost3 = () =>{

    const [images, setImages] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    // console.log({images, title, price, description});

      const postData = {
          title,
          price: Number(price),
          description,
          categoryId: 1, // required by API, you can make this dynamic
          images: [images]
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();
       
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if(response.ok){
                setImages('');
                setTitle('');
                setPrice('');
                setDescription('');
                const data = await response.json();
                console.log(data);
            }
            else{
                console.error('Failed to create product. Status:', response.status);
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <h3>Usepost3 Component</h3>

                <div className="row">
                    <form className="shadow p-3 mt-4 mb-5" onSubmit={handleSubmit}>
                        <input type="text" className="form-control mb-2" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                        <input type="text" className="form-control mb-2" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                        <input type="text" className="form-control mb-2" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                        <input type="text" className="form-control mb-2" name="images" value={images} onChange={(e) => setImages(e.target.value)} placeholder="Image URL" />
                        {images && (
                            <div>
                                <img src={images} alt="Product" className="img-fluid" style={{ maxWidth: '100px', marginBottom: '10px' }} />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Usepost3;