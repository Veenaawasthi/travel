import React from "react";
import { Link } from "react-router-dom";

const SideNav = ({handleLogout}) => {
  return (
    <div className="sidebar " style={{ backgroundColor: "#000066" }}>
      <ul className="list-unstyled">
        <li>
          <Link
            to="/dashboard"
            className="d-flex align-items-center text-white text-decoration-none"
          >
            <i
              className="bi bi-bar-chart me-2"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <span>Itinerary Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/query-dashboard"
            className="d-flex align-items-center text-white text-decoration-none"
          >
            <i className="bi bi-table me-2" style={{ fontSize: "1.5rem" }}></i>
            <span>Query Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/tourform"
            className="d-flex align-items-center text-white text-decoration-none"
          >
            <i
              className="bi bi-clipboard-data me-2"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <span>Query Form</span>
          </Link>
        </li>
        <li>
          <Link
            to="/form"
            className="d-flex align-items-center text-white text-decoration-none"
          >
            <i
              className="bi bi-journal-text me-2"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <span>Itinerary Form</span>
          </Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={handleLogout}
            className="d-flex align-items-center text-white text-decoration-none"
          >
            <i
              className="bi bi-box-arrow-right me-2"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
