import React, { useEffect, useState } from "react";
import "./Tourform.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConfig } from "../api/apiConfig";

const Tourform = ({
  addClient,
  editQeryFormData,
  updateQueryFormHandler,
  queryForms,
}) => {
  const navigate = useNavigate();
  // const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    adult: "",
    child: "",
    infant: "",
    company: "",
    name: "",
    city: "",
    address: "",
    mobile: "",
    email: "",
    status: "",
    duration: "",
    queryDate: "",
    tourStartDate: "",
    tourEndDate: "",
    uid: "",
    agentHandling: "",
  });

  // Function to calculate duration in days
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tourStartDate" || name === "tourEndDate") {
      const startDate =
        name === "tourStartDate" ? value : formData.tourStartDate;
      const endDate = name === "tourEndDate" ? value : formData.tourEndDate;
      const days = calculateDuration(startDate, endDate);
      setFormData({ ...formData, [name]: value, duration: days });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const accessToken = localStorage.getItem("access_token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Generate the unique identifier for the form submission
    const uid = generateTravelString(
      formData.adult,
      formData.name,
      formData.tourStartDate
    );
    const updatedFormData = { ...formData, uid };

    // Retrieve the CSRF token from cookies
    const csrfToken = Cookies.get("csrftoken");

    try {
      // Check if accessToken exists
      if (!accessToken) {
        throw new Error("Access token is missing. Please log in again.");
      }

      // Log formData to verify what is being sent
      console.log("Submitting form data:", updatedFormData);

      // Make the POST request to submit the form data
      const response = await apiConfig.post("query/", updatedFormData, {
        headers: {
          "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json",
          ...(csrfToken && { "X-CSRFToken": csrfToken }), // Include CSRF token if it exists
        },
      });

      console.log("Data submitted successfully", response.data);
      addClient([...queryForms, updatedFormData]);
      alert("Form submitted successfully");
      handleReset();
      navigate("/query-dashboard");
    } catch (error) {
      console.error("Error submitting form", error);

      // Check if the error response is unauthorized (401) or other status
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please check your login status.");
      } else {
        alert(`Failed to submit the form: ${error.message}`);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      adult: "",
      child: "",
      infant: "",
      company: "",
      name: "",
      city: "",
      address: "",
      mobile: "",
      email: "",
      status: "",
      duration: "",
      queryDate: "",
      tourStartDate: "",
      tourEndDate: "",
      uid: "",
      agentHandling: "",
    });
  };

  // useEffect(() => {
  //   apiConfig.get('http://127.0.0.1:8000/query/')
  //     .then(response => {
  //       setUsers(response.data.users);
  //     })
  //     .catch(error => {
  //       console.error("Error loading data: ", error);
  //     });
  // }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const csrfToken = Cookies.get("csrftoken");

    try {
      const uid = formData.uid; // Ensure the UID is correctly provided.
      if (!uid) {
        throw new Error("UID is missing. Cannot update the form.");
      }

      // Log formData to ensure it's being sent correctly
      console.log("Form data being sent for update:", formData);

      // Make the PUT request using the correct UID
      const response = await apiConfig.put(`query/${uid}/`, formData, {
        headers: {
          "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
       console.log(localStorage.getItem('access_token'))
      // Check the response status to confirm a successful update
      if (response.status === 200) {
        alert("Form updated successfully");
        handleReset(); // Reset the form after a successful update
        navigate("/query-dashboard"); // Navigate to the dashboard
      } else {
        alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating form:", error);

      // Handle different error cases based on the response.
      if (error.response) {
        // The request was made and the server responded with a status code outside of the 2xx range.
        if (error.response.status === 401) {
          alert("Unauthorized: Please login again.");
          navigate("/login"); // Redirect to the login page if unauthorized.
        } else {
          alert(
            `Failed to update the form: ${
              error.response.data.detail || error.message
            }`
          );
        }
      } else if (error.request) {
        // The request was made but no response was received.
        alert("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error.
        alert(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (editQeryFormData) {
      setFormData(editQeryFormData);
    }
  }, [editQeryFormData]);

  const generateTravelString = (adult, fullName, travelDate) => {
    const initials = fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
    const date = new Date(travelDate);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${String(adult).padStart(2, "0")}_${initials}${day}${month}${year}`;
  };

  return (
    <form
      className="form"
      onSubmit={editQeryFormData ? handleUpdate : handleSubmit}
    >
      <h1
        className="form-h1"
        style={{
          backgroundColor: " #000099",
          color: "white",
          borderRadius: "10%",
        }}
      >
        * Query Form *
      </h1>
      <div className="form-group">
        <label htmlFor="pax">Pax:</label>
        <div className="div pax input group ">
          <label htmlFor="adult">Adult(12+):</label>
          <input
            type="number"
            id="adult"
            name="adult"
            min="0"
            value={formData.adult}
            onChange={handleChange}
            required
          />
          <label htmlFor="child">Child(2-12):</label>
          <input
            type="number"
            id="child"
            name="child"
            min="0"
            value={formData.child}
            onChange={handleChange}
            required
          />
          <label htmlFor="infant">Infant(less than 2):</label>
          <input
            type="number"
            id="infant"
            name="infant"
            value={formData.infant}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Replied">Replied</option>
          <option value="Open">Open</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Lost">Lost</option>
          <option value="NA(Reason for NA)">NA(Reason for NA)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration (Days):</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="queryDate">Query Date:</label>
        <input
          type="date"
          id="queryDate"
          name="queryDate"
          value={formData.queryDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tourStartDate">Tour start date:</label>
        <input
          type="date"
          id="tourStartDate"
          name="tourStartDate"
          value={formData.tourStartDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tourEndDate">Tour end date:</label>
        <input
          type="date"
          id="tourEndDate"
          name="tourEndDate"
          value={formData.tourEndDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="uid">UID (File Name):</label>
        <input
          type="text"
          id="uid"
          name="uid"
          disabled
          value={formData.uid}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="agentHandling">
          Agent Handling (Initials of employee):
        </label>
        <input
          type="text"
          id="agentHandling"
          name="agentHandling"
          value={formData.agentHandling}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button
          onClick={editQeryFormData ? handleUpdate : handleSubmit}
          className="submit"
        >
          {editQeryFormData ? "Update" : "Submit"}
        </button>

        <button type="button" onClick={handleReset} className="reset">
          Reset
        </button>
      </div>
    </form>
  );
};

export default Tourform;
