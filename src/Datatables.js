import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Datatables = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({status:false, msg:""});
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setUserData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError({status: true, msg: error.message || "Something went wrong"});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const result = userData.filter((user) =>
      [user.name, user.email, user.username]
        .some(field =>
          field.toLowerCase().includes(search.toLowerCase())
        )
    );
    setFilteredData(result);
  }, [search, userData]);

  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleDeleteSelected = () => {
    const selectedIds = selectedRows.map(row => row.id);
    const newData = userData.filter(user => !selectedIds.includes(user.id));
    setUserData(newData);
    setFilteredData(newData);
    setSelectedRows([]);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Company",
      selector: (row) => row.company.name,
    },
  ];

  if (loading) return <h3>Datatable Loading...</h3>;
  if (isError?.status) return <h3 style={{color:"red"}}>{isError?.msg}</h3>;

  return (
    <div className="container mt-5">
      <h4 className="mb-3">User Data Table</h4>

     <div className="shadow p-3">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name, username, or email"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p className="mb-2">
            Showing <strong>{filteredData.length}</strong> of{" "}
            <strong>{userData.length}</strong> total records
            </p>

      {/* 🗑️ Delete Button (conditional) */}
      {selectedRows.length > 0 && (
        <button className="btn btn-danger mb-3" onClick={handleDeleteSelected}>
          Delete Selected ({selectedRows.length})
        </button>
      )}

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        selectableRows
        onSelectedRowsChange={handleSelectedRowsChange}
      />
      </div>
    </div>
  );
};

export default Datatables;
