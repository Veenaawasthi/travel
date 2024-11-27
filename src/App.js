import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Component/Login";
import Form from "./Component/Form";
import Dashboard from "./Component/Dashboard2";
import Tourform from "./Component/Tourform";
import { FormView } from "./Component/FormView";
import { dummyData, queryDashboardDummyData } from "./Component/Service";
import "./App.css";
import QeryDashboard from "./Component/QueryDashboard";
import Footer from "./Component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";
import SideNav from "./Component/SideNav";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [forms, setForms] = useState([...dummyData]);
  const [queryForms, setQueryForms] = useState([...queryDashboardDummyData]);
  const [itineraryData, setItineraryData] = useState(dummyData[0]);
  const [editFormData, setEditFormData] = useState({});
  const [editQeryFormData, setEditQeryFormData] = useState({});
  const [formList, setFormList] = useState([]);

  const isLoggedIn = Cookies.get("jwt")?.length > 0;

  const handleLogin = () => {
    setIsSidebarOpen(true);
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addForm = (form) => {
    if (!form) return;

    const fileCode = form.file_code?.trim() || "";
    if (!fileCode) {
      alert("File code is required.");
      return;
    }

    const newForm = {
      group_name: form.group_name?.trim() || "",
      file_code: fileCode,
      total_pax: Math.max(parseInt(form.total_pax, 10), 1),
      client_name: form.client_name?.trim() || "",
      tour_date: form.tour_date || "",
      flight: form.flight?.trim() || "",
      itinerary: form.itinerary?.trim() || "",
      date_of_qtn: form.date_of_qtn || "",
      agent: form.agent?.trim() || "",
      days: form.days || [],
      hotels: form.hotels || [],
      validity: form.validity ? form.validity.split("T")[0] : "",
      quotation_slabs: form.quotation_slabs || [],
    };

    setForms((prevForms) => [...prevForms, newForm]);
  };

  const handleUpdateForm = (updatedForm) => {
    if (!updatedForm) {
      console.error("Updated form data is undefined");
      return;
    }

    const fileCode = updatedForm.file_code?.trim() || "";
    if (!fileCode) {
      alert("File code is required.");
      return;
    }

    const newUpdatedForm = {
      ...updatedForm,
      total_pax: Math.max(parseInt(updatedForm.total_pax, 10), 1),
      validity: updatedForm.validity ? updatedForm.validity.split("T")[0] : "",
    };

    const updatedForms = forms.map((item) =>
      item.file_code === fileCode ? newUpdatedForm : item
    );

    setForms(updatedForms);
  };

  const updateQueryFormHandler = (updatedFormData) => {
    const filteredQueryForms = queryForms.map((item) =>
      item.uid === updatedFormData.uid ? updatedFormData : item
    );
    setQueryForms(filteredQueryForms);
  };

  useEffect(() => {
    setFormList(forms);
  }, [forms]);

  useEffect(() => {
    if (!isLoggedIn) {
      handleLogout();
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn && (
          <>
            <button
              className="hamburger-menu btn btn-light"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </button>
            {isSidebarOpen && <SideNav handleLogout={handleLogout} />}
          </>
        )}

        <div>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route
                  path="/form"
                  element={
                    <div className="main-content">
                      <Form onSubmit={addForm} />
                    </div>
                  }
                />
                <Route
                  path="/editForm"
                  element={
                    <div className="main-content">
                      {" "}
                      <Form
                        formData={editFormData}
                        onSubmit={handleUpdateForm}
                      />
                    </div>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <div className="main-content">
                      {" "}
                      <Dashboard
                        forms={formList}
                        setItineraryData={setItineraryData}
                        setEditFormData={setEditFormData}
                        setFormList={setFormList}
                      />
                    </div>
                  }
                />
                <Route
                  path="/queryeditForm"
                  element={
                    <div className="main-content">
                      <Tourform
                        editQeryFormData={editQeryFormData}
                        updateQueryFormHandler={updateQueryFormHandler}
                      />
                    </div>
                  }
                />
                <Route
                  path="/query-dashboard"
                  element={
                    <div className="main-content">
                      {" "}
                      <QeryDashboard
                        forms={queryForms}
                        setEditQeryFormData={setEditQeryFormData}
                      />
                    </div>
                  }
                />
                <Route
                  path="/view"
                  element={
                    <div className="main-content">
                      <FormView itineraryData={itineraryData} />
                    </div>
                  }
                />
                <Route
                  path="/tourform"
                  element={
                    <div className="main-content">
                      <Tourform
                        addClient={setQueryForms}
                        queryForms={queryForms}
                      />
                    </div>
                  }
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
        <ConditionalFooter />
      </div>
    </BrowserRouter>
  );
};

const ConditionalFooter = () => {
  const location = useLocation();
  return location.pathname === "/" ? <Footer /> : null;
};

export default App;
