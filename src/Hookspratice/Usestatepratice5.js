import React, { useState } from 'react'

const Usestatepratice5 = () => {

  const [list, setList] = useState([])

  const handleClick = (e) =>{
    e.preventDefault();
        const newUser={
            name: user,
            id: new Date().getTime().toString()
        }
        setList([...list, newUser])
        console.log("list data", list);
  }

  const [user, setUser] = useState({
    name:"",
    id: ""
  })

  const handleDelete = (id) =>{
     const userDelete = list.filter((eachUser) => eachUser.id !== id);
     setList(userDelete);
     console.log("delete user", userDelete);
  }

  return (
    <div>
        <div className='container'>
            <h2 className='mb-4 mt-4'>Inline Form</h2>
            <form>
              <div className='d-flex shadow p-3'>
                <input type="text" className='form-control me-2' value={user.name} onChange={(e)=> setUser(e.target.value)} />
                <input type='submit' className='btn btn-primary' onClick={handleClick} value="Submit" />
              </div>
            </form>
            <hr/>
             
                <h3>List of Users</h3>
                <div className='row'>
                    {list.map((eachUser)=>{
                        const {id, name} = eachUser;
                        return(
                            <div className='col-md-4 mb-3' key={id}>
                                <div className='card p-3'>
                                    <h5>{name}</h5>
                                    <button className='btn btn-danger' onClick={() => handleDelete(id)}>Delete</button>
                                    <button className='btn btn-info'>Edit</button>
                                </div>
                            </div>
                        )
                    })}
                </div>

        </div>
    </div>
  )
}

export default Usestatepratice5;
