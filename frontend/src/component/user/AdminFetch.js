import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchResults, loadData } from "../../action/promptAction";
import { isAuth } from "../../action/authAction";

const AdminFetch = () => {
  const inputData = useSelector((store) => store.inputData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const userData = isAuth();
    const data = { userId: userData._id }

    fetchResults(data)
      .then((res) => {
        const len = res.templates.length
        const templates = res.templates.map((val, i) => {
          const date = new Date(val.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });

          return { templateId: val._id, no: `${(i + 1)} of ${len}`, date: formattedDate, templateName: val.template_name }
        })

        setData(templates)
      })
      .catch((err) => console.log(err))
  }, [isAuth])

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
    item.templateName.toLowerCase().includes(filterText.toLowerCase())
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

  const handleLoad = (templateId) => {
    const userData = isAuth();
    const data = { templateId, userId: userData._id }
    console.log(data, '===data')

    loadData(data).then(res => {
      if (res.message === "ok") {
        history.push("/ManagementWindow");
      } else {
        alert(res.message)
      }
    }).catch((err) => console.log(err))
  }

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
              <td style={{ color: "#ff3300" }}>[delete]</td>
              <td style={{ color: "#ff3300" }}>[move up]</td>
              <td style={{ color: "#ff3300", cursor: "pointer" }} onClick={() => handleLoad(data.templateId)}>[load]</td>
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
