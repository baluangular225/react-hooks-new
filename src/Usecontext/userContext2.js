import React, { useEffect, useState } from "react";

export const UserContext2 = React.createContext();

export const UserContextProvider2 = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });

  const fetchApi = async (apiUrl) => {
    setLoading(true);  // Start loading
    setIsError({ status: false, msg: "" });  // Reset previous errors

    try {
      const response = await fetch(apiUrl);

      // Check for error status code before accessing JSON data
      if (response.status === 404) {
        throw new Error("Data not found (404)");
      }

      const data = await response.json();
      setUserDetails(data);
      setLoading(false);  // Stop loading after data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false);  // Stop loading in case of error
      setIsError({ status: true, msg: error.message || "Something went wrong" });
    }
  };

  useEffect(() => {
    fetchApi("https://jsonplaceholder.typicode.com/users");
  }, []);

  if (loading) {
    return (
      <h3 className="text-center mt-5" style={{color:"green"}}>Loading</h3>
    );
  }

  if (isError?.status) {
    return (
      <h3 className="text-center mt-5" style={{ color: "red" }}>{isError?.msg}</h3>
    );
  }

  return (
    <UserContext2.Provider value={userDetails}>
      {children}
    </UserContext2.Provider>
  );
};
