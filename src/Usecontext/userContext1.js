import React, { useState, useEffect } from "react";

// Create context
export const UserContext1 = React.createContext();

export const UserContextProvider1 = ({ children }) => {
  // Define state for holding fetched data
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your live API URL
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message); // Set error if there's any issue
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once when the component mounts

  // If data is loading, return a loading message or component
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, return an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Provide the fetched user data via context
  return (
    <UserContext1.Provider value={userData}>
      {children}
    </UserContext1.Provider>
  );
};
