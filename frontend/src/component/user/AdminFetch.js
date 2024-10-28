import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminFetch = () => {
  const inputData = useSelector((store) => store.inputData);
  const [data, setData] = useState([
    { no: 1, name:"asdf" ,date: "10/20/2024", templateName: "alinatel.com (title and description)" },
    { no: 2, name:"asdf" ,date: "4/28/2024", templateName: "piloteosa.com" },
    { no: 3, name:"asdf" ,date: "09/25/2024", templateName: "newblid.com" },
    { no: 4, name:"asdf" ,date: "03/15/2024", templateName: "payturbsnow.com" },
    { no: 5, name:"asdf" ,date: "06/2/2024", templateName: "alinatele.com" },
    { no: 6, name:"asdf" ,date: "11/29/2024", templateName: "jdev.com" },
    { no: 7, name:"asdf" ,date: "01/20/2024", templateName: "uplisting.io(blogs)" },
  ]);

  const [sortConfig, setSortConfig] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const history = useHistory();

  const handleBack = () => {
    history.push("/AdminPromptForm"); // Navigate back to Page1
  };

  const handleNext = () => {
    history.push("/ManagementWindow"); // Navigate to Page2
  };
console.log(paginatedData, "paginatedData")
  return (
    <div className="container mt-5">
      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col-md-1">
          <button className="form-control" onClick={handleBack}>
            Back
          </button>
        </div>
        <div className="offset-md-10 col-md-1">
          <button className="form-control" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      <h1>User Table</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filter by name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th onClick={() => requestSort("id")} style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}>
              No
            </th>
            <th
              onClick={() => requestSort("name")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Date
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Delete
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Move Up
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Load
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Template
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((data) => (
            <tr key={data.no}>
              <td>{data.no}</td>
              <td>{data.date}</td>
              <td style={{color: "#ff3300"}}>[delete]</td>
              <td style={{color: "#ff3300"}}>[move up]</td>
              <td style={{color: "#ff3300"}}>[load]</td>
              <td>{data.templateName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminFetch;
