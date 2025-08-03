import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './Redux/dataSlice'; // make sure path is correct

const DataUsers1 = () => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector(state => state.data);

  const handleDelete = async (id) =>{
     try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Something went wrong');
        }
        dispatch({type:'data/DELETE_POST', payload:id});
     } catch (error) {
        console.log(error);
     }
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <p className='text-center mt-5' style={{ color: "#12abdb" }}>Loading Post Users Data...</p>;
  }

  if (error) {
    return <p className='text-center mt-5' style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className='container'>
      <h3 className='mt-3 mb-3'>Users Data 2</h3>
      <div className='row'>
        {posts.map(({ id, title, body }) => (
          <div key={id} className='col-12 col-md-4 mb-3'>
            <div className='shadow p-3'>
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Body:</strong> {body}</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-danger rounded-0" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataUsers1;
