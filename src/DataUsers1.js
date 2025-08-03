import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './Redux/dataSlice'; // make sure path is correct

const DataUsers1 = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.data);

  // Handle Delete User
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }

      // Dispatch DELETE_USER action to update Redux state after successful deletion
      dispatch({ type: 'data/DELETE_USER', payload: id });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-5" style={{ color: "#12abdb" }}>Loading Users Data...</p>;
  }

  if (error) {
    return <p className="text-center mt-5" style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="container">
      <h3 className="mt-3 mb-3">Users Data1</h3>
      <div className="row">
        {users.map(({ id, name, email, phone, website }) => (
          <div key={id} className="col-12 col-md-4 mb-3">
            <div className="shadow p-3">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Website:</strong> {website}</p>
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
