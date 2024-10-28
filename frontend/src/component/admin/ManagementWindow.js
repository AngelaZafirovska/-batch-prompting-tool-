import React, { useState } from 'react';
import styles from './style.css';

const ManagementWindow = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob', age: 34 },
    { id: 3, name: 'Charlie', age: 22 },
    { id: 4, name: 'David', age: 30 },
    { id: 5, name: 'Eve', age: 29 },
    { id: 6, name: 'Frank', age: 25 },
    { id: 7, name: 'Grace', age: 27 },
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
    <div className="container mt-5" style={{ padding: '50px', border: '2px solid black' }}>
        <h3 className="text-center">OpenAI API FAQ Prompts</h3><br />
        <h5 className="text-center" style={{ color: 'red' }}>List of All Domains</h5>
        <a href='asdfas'><h3 className="text-center" style={{ color: 'red' }}>Start Autoload to Fetch All</h3></a> <br /><br />
        <h5 className="text-center">List of All Domains</h5>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th  onClick={() => requestSort('id')} style={{ cursor: 'pointer', alignItems: 'center', justifyContent: 'center'}}>Domain</th>
              <th  onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>Unique <br />Target<br /> URLs</th>
              <th  onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Prompts <br />Fetched</th>
              <th  onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Prompts To<br />Be Fetched</th>
              <th  onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Exported</th>
              <th  onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>List <br />Target URLs</th>
              <th  onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Export <br />All</th>
              <th  onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>Remove <br />All</th>
              <th  onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}> Queue</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
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

export default ManagementWindow;
