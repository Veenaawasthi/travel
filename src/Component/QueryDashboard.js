import { useState, useEffect } from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { apiConfig } from "../api/apiConfig";

const QueryDashboard = ({ setEditQeryFormData }) => {
  const [searchUID, setSearchUID] = useState("");
  const [queryFormList, setQueryFormList] = useState([]);
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 8;
  const navigate = useNavigate();

  const handleEdit = (form) => {
    setEditQeryFormData(form);
    navigate("/queryeditForm");
  };
 

  
  const fetchQueries = async () => {
    let isMounted = true; // Track whether component is mounted
    try {
      const response = await apiConfig.get("query/",{
        headers: {
          "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json",
          "X-CSRFToken": localStorage.getItem('access_token'),
        },
      });
      if (isMounted) { // Only update state if mounted
        setQueries(response.data);
        setQueryFormList(response.data);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
    return () => { isMounted = false; }; // Cleanup function to set isMounted to false
  }

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    if (searchUID.length) {
      const filteredForms = queries.filter((form) =>
        form.uid.toLowerCase().includes(searchUID.toLowerCase())
      );
      setQueryFormList(filteredForms);
    } else {
      setQueryFormList(queries);
    }
  }, [queries, searchUID]);

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Replied":
        return "status-Replied";
      case "Open":
        return "status-Open";
      case "Lost":
        return "status-Lost";
      case "Confirmed":
        return "status-Confirmed";
      case "NA":
        return "status-NA";
      default:
        return "";
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(queryFormList.length / queriesPerPage);
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = queryFormList.slice(indexOfFirstQuery, indexOfLastQuery);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Query Dashboard</h1>
      <div className="search-bar">
        <label className="search-label">Search by UID</label>
        <input
          type="text"
          value={searchUID}
          onChange={(e) => setSearchUID(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="total-queries">
        <p>Total Queries: {queries.length}</p>
      </div>
      {currentQueries.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table className="queries-table">
          <thead>
            <tr>
              <th><i className="bi bi-file-earmark-text"></i> UID</th>
              <th><i className="bi bi-person"></i> Client Name</th>
              <th><i className="bi bi-building"></i> Company Name</th>
              <th><i className="bi bi-flag"></i> Status</th>
              <th><i className="bi bi-calendar"></i> Query Date</th>
              <th><i className="bi bi-calendar-date"></i> Tour Start Date</th>
              <th><i className="bi bi-person-badge"></i> Agent</th>
              <th><i className="bi bi-house-door"></i> Address</th>
              <th><i className="bi bi-gear"></i> Action</th>
            </tr>
          </thead>
          <tbody>
            {currentQueries.map((form, index) => (
              <tr key={index}>
                <td>{form.uid}</td>
                <td>{form.name}</td>
                <td>{form.company}</td>
                <td className={getStatusColorClass(form.status)}>
                  <i className={`bi bi-circle-fill ${getStatusColorClass(form.status)}`}></i> {form.status}
                </td>
                <td>{form.queryDate}</td>
                <td>{form.tourStartDate}</td>
                <td>{form.agentHandling}</td>
                <td>
                  {form.address}, {form.city}
                </td>
                <td>
                  <button onClick={() => handleEdit(form)}>
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QueryDashboard;
