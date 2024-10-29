import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import styles from "./style.css";

const data = [
  { id: 1, name: "Alice", Domain: "Alinatelehealth.com", targetURL: 1, prompts: 423,tobefetched: 0, exported:423 },
  { id: 2, name: "Bob", Domain: "newsBlind.co.uk", targetURL: 2, prompts: 3,tobefetched: 36, exported:0 },
  { id: 3, name: "Charlie", Domain: "Alinatelehealth.com", targetURL: 2, prompts: 3,tobefetched: 0, exported:5 },
  ];
const ManagementWindow = () => {
  const history = useHistory();


  const [sortConfig, setSortConfig] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const hanldeLink = (e) =>{
    history.push("/user/FetchResult");
    e.preventDefault();

  }
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

  const handleBack = () => {
    history.push("/user/AdminFetch"); // Navigate back to Page1
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="container mt-5">
      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col-md-1">
          <button className="form-control" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
      <h3 className="text-center">OpenAI API FAQ Prompts</h3>
      <br />
      <h5 className="text-center" style={{ color: "#ff3300", fontSize: "16px", marginBottom: "1.5rem" }}>
        There are 36 prompots left to be fetched.
        <br />
        The page will autoload until you close this window.
      </h5>
      <a href="" style={{color: '#ff6600', textDecorationStyle: "underline", textDecorationColor: "#ff6600"}} onClick={hanldeLink}>
        <h3 className="text-center" style={{ color: "#ff4500", textDecorationColor:"#ff4400",textDecorationStyle: "underline", cursor: "pointer"}}>
          Start Autoload to Fetch All
        </h3>
      </a>
      <br />
      <br />
      <h5 className="text-center">List of All Domains</h5>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th
              onClick={() => requestSort("id")}
              style={{
                cursor: "pointer", backgroundColor: "#cdd7dc",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Domain
            </th>
            <th
              onClick={() => requestSort("name")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Unique <br />
              Target
              <br /> URLs
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Prompts <br />
              Fetched
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Prompts To
              <br />
              Be Fetched
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Exported
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              List <br />
              Target URLs
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Export <br />
              All
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              Remove <br />
              All
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", backgroundColor: "#cdd7dc" }}
            >
              {" "}
              Queue
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user) => (
            <tr key={user.id}>
              <td>{user.Domain}</td>
              <td>{user.targetURL}</td>
              <td>{user.prompts}</td>
              <td>{user.tobefetched}</td>
              <td>{user.exported}</td>
              <td style={{color: "#ff4500"}}>[List]</td>
              <td style={{color: "#ff4500"}}>[Export]</td>
              <td style={{color: "#ff4500"}}>[Remove]</td>
              <td style={{color: "#ff4500"}}>[MoveUp]</td>

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

export default ManagementWindow;
