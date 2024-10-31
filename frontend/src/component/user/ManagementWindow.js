import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllDomains, fetchAllPrompts } from "../../action/promptAction";
import { isAuth } from "../../action/authAction";

// import styles from "./style.css";

const data = [
  { id: 1, name: "Alice", Domain: "Alinatelehealth.com", targetURL: 1, prompts: 423, tobefetched: 0, exported: 423 },
  { id: 2, name: "Bob", Domain: "newsBlind.co.uk", targetURL: 2, prompts: 3, tobefetched: 36, exported: 0 },
  { id: 3, name: "Charlie", Domain: "Alinatelehealth.com", targetURL: 2, prompts: 3, tobefetched: 0, exported: 5 },
];
const ManagementWindow = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [promptsNum, setPromptsNum] = useState(0)
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      const userData = isAuth();
      const data = { userId: userData._id };

      getAllDomains(data)
        .then((res) => {
          if (res) {
            const domains = res.allDomains;
            if (domains?.length > 0) {
              const num = domains.reduce((accumulator, domain) => {
                return accumulator + domain.prompts_tobe_fetched;
              }, 0);

              setPromptsNum(num);
              setData(domains);
            }
            setIsFetched(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isFetched])


  const [sortConfig, setSortConfig] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const hanldeLink = (e) => {
    e.preventDefault();

    const userData = isAuth();
    const data = { userId: userData._id }
    fetchAllPrompts(data).then((res) => {
      console.log(res)
      history.push("/user/FetchResult");

    }).catch((err) => console.log(err))
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
    item.domain.toLowerCase().includes(filterText.toLowerCase())
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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      <div className="container step-container">
        <ul id="progressbar">
          <li onClick={() => handleStep(1)} id="form"><strong>Form</strong></li>
          <li onClick={() => handleStep(2)} id="template"><strong>Template ManagementTool</strong></li>
          <li onClick={() => handleStep(3)} className="active" id="prompt"><strong>Prompts</strong></li>
          <li onClick={() => handleStep(4)} id="fetchresult"><strong>Fetch Result</strong></li>
        </ul>
      </div>
      <div className="container">
        <h3 className="text-center title mt-4">OpenAI API FAQ Prompts</h3>
        <br />

        {paginatedData.length === 0 && !isFetched && (
          <div className="alert alert-primary" role="alert">
            Loading...
          </div>
        )}

        {
          paginatedData && paginatedData.length !== 0 && isFetched ?
            <>
              <h5 className="text-center" style={{ color: "#ff3300", fontSize: "16px", marginBottom: "1.5rem" }}>
                There are {promptsNum > 0 ? promptsNum : 'no'} prompts left to be fetched.
                <br />
                The page will autoload until you close this window.
              </h5>
              <a href="" style={{ color: '#ff6600', textDecorationStyle: "underline", textDecorationColor: "#ff6600" }} onClick={hanldeLink}>
                <h3 className="text-center" style={{ color: "#ff4500", textDecorationColor: "#ff4400", textDecorationStyle: "underline", cursor: "pointer" }}>
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
                    <tr key={Math.random()}>
                      <td>{user.domain}</td>
                      <td>{user.unique_target_urls}</td>
                      <td>{user.prompts_fetched}</td>
                      <td>{user.prompts_tobe_fetched}</td>
                      <td>{user.exported_count}</td>
                      <td className="link-title">[List]</td>
                      <td className="link-title">[Export]</td>
                      <td className="link-title">[Remove]</td>
                      <td className="link-title">[MoveUp]</td>

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

export default ManagementWindow;
