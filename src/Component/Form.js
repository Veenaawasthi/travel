import React, { useState, useEffect } from "react";
import { cityServiceMapping, servicePriceMapping } from "./Service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConfig } from "../api/apiConfig";
import {
  ItineraryFormCpmponent,
  ItineraryDetailsTable,
  TotalSeriveTable,
  HotelEnvisagedTable,
  QuotationSlabTable,
  TermConditionTab,
  addButtonStyle,
  removeButtonStyle
} from "./FormUtills";

const Form = ({ formData, onSubmit }) => {
  const navigate = useNavigate();
  const [quotationSlabs, setQuotationSlabs] = useState([
    { slab: "", max_pax: "", min_pax: "", no_of_foc: "", pp_cost: "" },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPax, setTotalPax] = useState("");
  const [formState, setFormState] = useState({
    file_code: "",
    validity: "",
    client_name: "",
    itinerary: "",
    group_name: "",
    total_pax: "",
    tour_date: "",
    flight: "",
    date_of_qtn: "",
    agent: "",
    inclusions: true,
    exclusions: true,
    terms: true,
    days: [
      {
        day: "1",
        date: "",
        city: "",
        time: "",
        service: "",
        mode: "",
        meal: "",
        duration: "",
        price: "0",
        availableServices: [],
      },
    ],
    hotels: [
      {
        city: "",
        dates: "",
        nights: "",
        hotel: "",
      },
    ],
    quotationSlabs: [
      { slab: "", max_pax: "0", min_pax: "0", no_of_foc: "1", pp_cost: "" },
    ],
  });

  useEffect(() => {
    if (formData) {
      const editFormData = {
        group_name: formData.group_name || "",
        file_code: formData.file_code || "",
        total_pax: formData.total_pax || "",
        tour_date: formData.tour_date || "",
        flight: formData.flight || "",
        client_name: formData.client_name || "",
        date_of_qtn: formData.date_of_qtn || "",
        agent: formData.agent || "",
        itinerary: formData.itinerary || "",
        validity: formData.validity || "",
        inclusions: formData.inclusions ?? [],
        exclusions: formData.exclusions ?? [],
        terms: formData.terms ?? [],
        days:
          formData.days?.map((day) => ({
            ...day,
            availableServices: cityServiceMapping[day.city] || [],
          })) || [],
        hotels: formData.hotels || [],
        quotationSlabs: formData.quotation_slabs || [],
      };

      setFormState(editFormData);
      setQuotationSlabs(editFormData.quotationSlabs);
    }
  }, [formData]);

  useEffect(() => {
    const priceSum = formState.days.reduce(
      (acc, day) => acc + parseFloat(day.price || 0),
      0
    );
    setTotalPrice(priceSum * totalPax);
  }, [formState, totalPax]);

  const handleTotalPaxChange = (e) => {
    setTotalPax(parseInt(e.target.value) || 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDayChange = (index, e) => {
    const { id, value } = e.target;
    setFormState((prevState) => {
      const updatedDays = [...prevState.days];
      updatedDays[index][id] = value;
      return { ...prevState, days: updatedDays };
    });
  };

  const handleCityChange = (dayIndex, event) => {
    const selectedCity = event.target.value;
    const availableServices = cityServiceMapping[selectedCity] || [];
    setFormState((prevState) => {
      const updatedDays = [...prevState.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        city: selectedCity,
        availableServices,
        service: "",
      };
      return { ...prevState, days: updatedDays };
    });
  };

  const handleServiceChange = (dayIndex, e) => {
    const { value } = e.target;
    setFormState((prevData) => {
      const updatedDays = [...prevData.days];
      updatedDays[dayIndex].service = value;
      updatedDays[dayIndex].price = servicePriceMapping[value] || "0";
      return {
        ...prevData,
        days: updatedDays,
      };
    });
  };

  const handleDateChange = (dayIndex, e) => {
    const { value } = e.target;
    setFormState((prevData) => {
      const updatedDays = [...prevData.days];
      updatedDays[dayIndex].date = value;
      return { ...prevData, days: updatedDays };
    });
  };

  const handleDurationChange = (dayIndex, e) => {
    const { value } = e.target;
    setFormState((prevData) => {
      const updatedDays = [...prevData.days];
      updatedDays[dayIndex].duration = value;
      return { ...prevData, days: updatedDays };
    });
  };

  const addDay = () => {
    setFormState((prevData) => ({
      ...prevData,
      days: [
        ...prevData.days,
        {
          day: String(prevData.days.length + 1),
          date: "",
          city: "",
          service: "",
          mode: "",
          duration: "",
          meal: "",
          price: "0",
          availableServices: [],
        },
      ],
    }));
  };

  const removeDay = (index) => {
    setFormState((prevState) => {
      const updatedDays = prevState.days.filter(
        (_, dayIndex) => dayIndex !== index
      );
      return { ...prevState, days: updatedDays };
    });
  };

  const handleHotelChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHotels = [...formState.hotels];
    updatedHotels[index][name] = value;
    setFormState((prevData) => ({
      ...prevData,
      hotels: updatedHotels,
    }));
  };

  const addHotel = () => {
    setFormState((prevData) => ({
      ...prevData,
      hotels: [
        ...prevData.hotels,
        {
          city: "",
          dates: "",
          nights: "",
          hotel: "",
        },
      ],
    }));
  };

  const removeHotel = (index) => {
    const updatedHotels = formState.hotels.filter((_, i) => i !== index);
    setFormState((prevData) => ({
      ...prevData,
      hotels: updatedHotels,
    }));
  };

  const handleQuotationSlabChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSlabs = quotationSlabs.map((slab, i) =>
      i === index ? { ...slab, [name]: value } : slab
    );
    setQuotationSlabs(updatedSlabs);
  };

  const removeQuotationSlabRow = (index) => {
    const updatedSlabs = quotationSlabs.filter((_, i) => i !== index);
    setQuotationSlabs(updatedSlabs);
  };

  const addQuotationSlabRow = () => {
    setQuotationSlabs((prevSlabs) => [
      ...prevSlabs,
      { slab: "", max_pax: "", min_pax: "", no_of_foc: "", pp_cost: "" },
    ]);
  };

  const updatedFormData = {
    group_name: formState.group_name?.trim() || "",
    file_code: formState.file_code?.trim() || "",
    total_pax: Math.max(parseInt(formState.total_pax, 10), 1),
    client_name: formState.client_name?.trim() || "",
    tour_date: formState.tour_date || "",
    flight: formState.flight?.trim() || "",
    itinerary: formState.itinerary?.trim() || "",
    date_of_qtn: formState.date_of_qtn || "",
    agent: formState.agent?.trim() || "",
    validity: formState.validity || "",
    days: formState.days.map((day) => ({
      day: parseInt(day.day, 10) || 1,
      date: day.date || "",
      time: day.time || "",
      city: day.city?.trim() || "",
      duration: day.duration || "",
      service: day.service?.trim() || "",
      mode: day.mode?.trim() || "",
      meal: day.meal?.trim() || "",
      price: parseFloat(day.price) || 0,
    })),
    hotels: formState.hotels.map((hotel) => ({
      city: hotel.city?.trim() || "",
      dates: hotel.dates || "",
      nights: Math.max(parseInt(hotel.nights, 10), 1),
      hotel: hotel.hotel?.trim() || "",
    })),
    quotation_slabs: quotationSlabs.map((slab) => ({
      slab: slab.slab?.trim() || "",
      max_pax: Math.max(parseInt(slab.max_pax, 10), 0),
      min_pax: Math.max(parseInt(slab.min_pax, 10), 0),
      no_of_foc: Math.max(parseInt(slab.no_of_foc, 10), 0) || 1,
      pp_cost: Math.max(parseFloat(slab.pp_cost), 0),
    })),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("jwt");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      return;
    }
    const csrfToken = Cookies.get("csrftoken");
    try {
      if (updatedFormData) {
        await apiConfig.post("itineraries/", updatedFormData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
            ...(csrfToken && { "X-CSRFToken": csrfToken }),
          },
        });
        alert("Form submitted successfully");

        onSubmit();
        navigate("/Dashboard");
      } else {
        alert("No form data available to submit.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = async () => {
    const token = Cookies.get("jwt");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }

    if (!updatedFormData) {
      alert("Updated form data is not available.");
      return;
    }

    // Extract and validate the fileCode from updatedFormData
    const fileCode = updatedFormData.file_code?.trim();
    if (!fileCode) {
      alert("File code is missing.");
      return;
    }
    const csrfToken = Cookies.get("csrftoken");
    try {
      // Make the PUT request to update the form data using the provided file code
      const response = await apiConfig.put(
        `itineraries/${fileCode}/`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
            ...(csrfToken && { "X-CSRFToken": csrfToken }),
          },
        }
      );
      if (response.status === 200) {
        alert("Form updated successfully");
        navigate("/Dashboard");
      } else {
        alert(`Unexpected response from server: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating form:", error);
      const errorMessage =
        error.response?.data?.detail ||
        "An unknown error occurred while updating the form.";
      alert(`Error updating form: ${errorMessage}`);

      // Optional: Handle specific error codes if needed (e.g., unauthorized access)
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#3366CC",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ fontFamily: "Arial, sans-serif", color: "black" }}>
        ITINERARY FORM
      </h1>

      <ItineraryFormCpmponent
        formState={formState}
        handleChange={handleChange}
      />

      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          marginTop: "20px",
        }}
      >
        Itinerary Details
      </h2>
      <div className="form-table" style={{ marginTop: "10px" }}>
        <ItineraryDetailsTable
          formState={formState}
          handleDayChange={handleDayChange}
          handleDateChange={handleDateChange}
          handleCityChange={handleCityChange}
          cityServiceMapping={cityServiceMapping}
          handleDurationChange={handleDurationChange}
          handleServiceChange={handleServiceChange}
          removeDay={removeDay}
          addDay={addDay}
        />
        <h2
          style={{
            fontFamily: "Arial, sans-serif",
            color: "#333",
            marginTop: "20px",
          }}
        >
          Total Service Price
        </h2>

        <TotalSeriveTable
          totalPrice={totalPrice}
          totalPax={totalPax}
          handleTotalPaxChange={handleTotalPaxChange}
        />
      </div>
      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          marginTop: "20px",
        }}
      >
        Hotels Envisaged:
      </h2>
      <div className="form-table" style={{ marginTop: "10px" }}>
        <HotelEnvisagedTable
          formState={formState}
          handleHotelChange={handleHotelChange}
          removeHotel={removeHotel}
          addHotel={addHotel}
          cityServiceMapping={cityServiceMapping}
        />
      </div>
      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          marginTop: "20px",
        }}
      >
        Quotation Slab
      </h2>
      <div className="form-table" style={{ marginTop: "10px" }}>
        <QuotationSlabTable
          quotationSlabs={quotationSlabs}
          handleQuotationSlabChange={handleQuotationSlabChange}
          removeQuotationSlabRow={removeQuotationSlabRow}
          addQuotationSlabRow={addQuotationSlabRow}
        />
      </div>
      <TermConditionTab formState={formState} handleChange={handleChange} />

      <div style={{ marginTop: "20px" ,gap:'10px',display:'flex'}}>
        <button
          onClick={formData ? handleUpdate : handleSubmit}
          style={addButtonStyle}
        >
          {formData ? "Update" : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={removeButtonStyle}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default Form;
