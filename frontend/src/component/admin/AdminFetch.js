import React, { useState } from 'react';

const AdminFetch = () => {
  const [data, setData] = useState([
    { no: 1, name: 'Alice', age: 28 },
    { no: 2, name: 'Bob', age: 34 },
    { no: 3, name: 'Charlie', age: 22 },
    { no: 4, name: 'David', age: 30 },
    { no: 5, name: 'Eve', age: 29 },
    { no: 6, name: 'Frank', age: 25 },
    { no: 7, name: 'Grace', age: 27 },
  ]);

  const [sortConfig, setSortConfig] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="container mt-5" style={{ color: 'blue', padding: '50px', border: '2px solid black' }}>
      <h1>User Table</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filter by name..."
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>No</th>
            <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>Date</th>
            <th onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Delete</th>
            <th onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Move Up</th>
            <th onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Load</th>
            <th onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Template</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(user => (
            <tr key={user.no}>
              <td>{user.no}</td>
              <td>{user.date}</td>
              <td>{user.delete}</td>
              <td>{user.moveU}</td>
              <td>{user.delete}</td>
              <td>{user.delete}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button 
          className="btn btn-secondary" 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          className="btn btn-secondary" 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminFetch;
