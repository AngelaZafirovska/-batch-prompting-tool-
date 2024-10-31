import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
import { fetchTemplates, loadData } from "../../action/promptAction";
import { isAuth } from "../../action/authAction";

const AdminFetch = () => {
  // const inputData = useSelector((store) => store.inputData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isFetched, setIsFetched] = useState(false);

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

  useEffect(() => {
    if (!isFetched) {
      const fetchData = async () => {
        const userData = isAuth();
        const fetchParams = { userId: userData._id };

        try {
          const res = await fetchTemplates(fetchParams);
          if (res) {
            const templates = res.templates?.map((val, i) => {
              const date = new Date(val.date);
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              });
              return {
                templateId: val._id,
                no: `${i + 1} of ${res.templates.length}`,
                date: formattedDate,
                templateName: val.template_name,
              };
            });
            setData(templates || []);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsFetched(true);
        }
      };

      fetchData();
    }
  }, [isFetched, paginatedData])

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
    history.push("/user"); // Navigate back to Page1
  };

  const handleNext = () => {
    history.push("/user/ManagementWindow"); // Navigate to Page2
  };

  const handleLoad = (templateId) => {
    const userData = isAuth();
    const data = { templateId, userId: userData._id }
    setLoading(true)

    loadData(data).then(res => {
      if (res.message === "ok") {
        history.push("/user/ManagementWindow");
      } else {
        alert(res.message)
      }
      setLoading(false)
    }).catch((err) => { setLoading(false) })
  }

  const handleStep = (step) => {
    switch (step) {
      case 1:
        history.push("/user");
        break;
      case 2:
        history.push("/user/AdminFetch");
        break;
      case 3:
        history.push("/user/ManagementWindow");
        break;
      case 4:
        history.push("/user/FetchResult");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container step-container">
        <ul id="progressbar">
          <li onClick={() => handleStep(1)} id="form"><strong>Form</strong></li>
          <li onClick={() => handleStep(2)} className="active" id="template"><strong>Template ManagementTool</strong></li>
          <li onClick={() => handleStep(3)} id="prompt"><strong>Prompts</strong></li>
          <li onClick={() => handleStep(4)} id="fetchresult"><strong>Fetch Result</strong></li>
        </ul>
      </div>
      <div className="container">
        <h2 className="text-center title">OpenAI API Templates</h2>
        <br />

        {
          loading &&
          <div className="alert alert-primary" role="alert">
            Now template load processing...
          </div>
        }
        {paginatedData.length === 0 && !isFetched && (
          <div className="alert alert-primary" role="alert">
            Loading...
          </div>
        )}

        {
          paginatedData && paginatedData.length !== 0 && isFetched ?
            <>
              <div className="row mt-5">
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
                    {
                      paginatedData.map((data) => (
                        <tr key={data.no}>
                          <td>{data.no}</td>
                          <td>{data.date}</td>
                          <td style={{ color: "#ff3300" }}>[delete]</td>
                          <td style={{ color: "#ff3300" }}>[move up]</td>
                          <td style={{ color: "#ff3300", cursor: "pointer" }} onClick={() => handleLoad(data.templateId)}>[load]</td>
                          <td>{data.templateName}</td>
                        </tr>
                      ))
                    }
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
            </>
            :
            <>
              {isFetched ?
                <div className="text-center">
                  No data. Please enter form data and press the 'Process' button.
                </div>
                :
                null
              }
            </>
        }

      </div>
    </>
  );
};

export default AdminFetch;
