import React, { useEffect, useState } from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { format } from 'date-fns';
import { apiConfig } from "../api/apiConfig";

const Dashboard = ({ setItineraryData, setEditFormData }) => {
  const [searchName, setSearchName] = useState("");
  const [searchFileCode, setSearchFileCode] = useState("");
  const [formList, setFormList] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(8); // Show 8 forms per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const response = await apiConfig.get('itineraries/',
          {
            headers: {
              "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
              "Content-Type": "application/json",
              "X-CSRFToken": localStorage.getItem('access_token'),
            },
          }
        );
        setFormList(response.data);
        setFilteredForms(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = formList.filter((form) => {
      const clientName = form.client_name || "";
      const fileCode = form.file_code || "";
      return (
        clientName.toLowerCase().includes(searchName.toLowerCase()) &&
        fileCode.toLowerCase().includes(searchFileCode.toLowerCase())
      );
    });
    setFilteredForms(filtered);
  }, [formList, searchFileCode, searchName]);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Get current forms for pagination
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = filteredForms.slice(indexOfFirstForm, indexOfLastForm);

  const handleEdit = (form) => {
    const editFormData = {
      ...form,
      hotels: form.hotels || [],
      quotationSlabs: form.quotationSlabs || [],
    };
    setEditFormData(editFormData);
    navigate("/editForm");
  };

  const handleView = (form) => {
    const viewFormData = {
      ...form,
      hotels: form.hotels || [],
      quotationSlabs: form.quotationSlabs || [],
    };
    setItineraryData(viewFormData);
    navigate("/view");
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  // Logic to create pagination buttons
  const totalPages = Math.ceil(filteredForms.length / formsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Itinerary Dashboard</h1>
      <div className="search-bar">
        <label>Search by Name</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <label>Search by File Code</label>
        <input
          type="text"
          value={searchFileCode}
          onChange={(e) => setSearchFileCode(e.target.value)}
        />
      </div>
      <div className="total-itineraries">
        <p>Total Itineraries: {filteredForms.length}</p>
      </div>
      {currentForms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th><i className="bi bi-file-earmark-text"></i> File Code</th>
              <th><i className="bi bi-person"></i> Name</th>
              <th><i className="bi bi-house-door"></i> Group Name</th>
              <th><i className="bi bi-people"></i> Total Pax</th>
              <th><i className="bi bi-calendar"></i> Tour Date</th>
              <th><i className="bi bi-plane"></i> Flight</th>
              <th><i className="bi bi-gear"></i> Action</th>
            </tr>
          </thead>
          <tbody>
            {currentForms.map((form, index) => (
              <tr key={index}>
                <td>{form.file_code || ""}</td>
                <td>{form.client_name || ""}</td>
                <td>{form.group_name || ""}</td>
                <td>{form.total_pax !== null ? form.total_pax : ""}</td>
                <td>{form.tour_date ? format(new Date(form.tour_date), 'MM/dd/yyyy') : ""}</td>
                <td>{form.flight || ""}</td>
                <td>
                  <button onClick={() => handleView(form)}>
                    <i className="bi bi-eye"></i> View Form Details
                  </button>
                  <button onClick={() => handleEdit(form)}>
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`page-button ${number === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
