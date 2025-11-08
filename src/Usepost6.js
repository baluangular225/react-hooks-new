import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

const Usepost6 = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [website, setWebsite] = React.useState('');

    // console.log({name, email, phone, website});
    const EmployeeData = {name, email, phone, website};

    const formSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
                method: 'POST',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(EmployeeData)
            })
            if(response.ok){
                const data = await response.json();
                if (!data) throw new Error('Employee Creation Failed');
                setName('');
                setEmail('');
                setPhone('');
                setWebsite('');
                console.log(data);
            }
        } catch (error) {
            console.log('Error in submitting the form', error);
        }
    }

    return(
        <div>
            <Header/>

            <div className="container">
                  <h4 className="mt-3 mb-3">Usepost6 Component</h4>

                    <div className="shadow p-3 mt-4 mb-5">
                        <form onSubmit={formSubmit}>
                            <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} name="title" placeholder="Title" />
                            <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" />
                            <input type="number" className="form-control mb-2" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" placeholder="Phone" />
                            <input type="text" className="form-control mb-2" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" placeholder="Website" />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Usepost6;