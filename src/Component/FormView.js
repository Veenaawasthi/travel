import React, { useEffect, useState } from "react";
import "./FormView.css";
import {
  tourConditionData,
  TransportaionRules,
  Exclusion,
  Inclusions,
} from "./Service";
import GoogleTranslate from "../Component/Googletranslate";
import { useTranslation } from "react-i18next";
import html2pdf from "html2pdf.js";
import CityMap from "./CityMap";
export const FormView = ({ itineraryData = {} }) => {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState(itineraryData.days || []);
  const [hotels, setHotels] = useState(itineraryData.hotels || []);
  const [quotationSlab, setQuotationSlab] = useState(
    itineraryData.quotation_slabs || []
  );

  useEffect(() => {
    setServices(itineraryData.days || []);
    setHotels(itineraryData.hotels || []);
    setQuotationSlab(itineraryData.quotation_slabs || []);
  }, [itineraryData]);
  const cityList= services.map(item => item.city)||[]
  const handlePrintPdf = () => {
    const element = document.getElementById("printSection");
    if (!element) {
      console.error("Element with id 'printSection' not found.");
      return;
    }

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `itinerary_${i18n.language}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "landscape",
      },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const getIconClass = (service) => {
    switch (service) {
      case "City":
        return "fas fa-location";
      case "Time":
        return "fas fa-clock";
      case "Service":
        return "bi bi-geo";
      case "Mode":
        return "fas fa-subway";
      case "File Code":
        return "fas fa-file-alt";
      case "Group Name":
        return "fas fa-users";
      case "Total Pax":
        return "fas fa-user-friends";
      case "Client Name":
        return "fas fa-user";
      case "Agent":
        return "fas fa-user-tie";
      case "Itinerary":
        return "fas fa-map-signs";
      case "Validity":
        return "fas fa-calendar-check";
      case "Tour Date":
        return "fas fa-calendar";
      case "Date of QTN":
        return "fas fa-calendar-alt";
      default:
        return "";
    }
  };
  return (
    <div className="formViewContainer">
      <GoogleTranslate />
      <div className="language-switcher">
        <label>
          <input
            type="radio"
            value="en"
            checked={i18n.language === "en"}
            onChange={() => i18n.changeLanguage("en")}
          />
          English
        </label>
        <label>
          <input
            type="radio"
            value="jp"
            checked={i18n.language === "jp"}
            onChange={() => i18n.changeLanguage("jp")}
          />
          Japanese
        </label>
      </div>

      <button
        onClick={handlePrintPdf}
        className="btn btn-primary mb-3 download-button"
      >
        <i className="fas fa-print"></i> {t("printPdf")}
      </button>

      <div className="print-section" id="printSection">
        <header className="header">
          <img src={"/Logo RD.jpg"} alt="Rising Destination" className="logo" />
          <h1>Experiential Japan Package</h1>
          <h2>{itineraryData.validity || "N/A"}</h2>
        </header>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <i className={getIconClass("File Code")}></i> {t("fileCode")}
              </td>
              <td>{itineraryData.file_code || "N/A"}</td>
              <td>
                <i className={getIconClass("Agent")}></i> {t("agent")}
              </td>
              <td colSpan="3">{itineraryData.agent || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <i className={getIconClass("Group Name")}></i> {t("groupName")}
              </td>
              <td>{itineraryData.group_name || "N/A"}</td>
              <td>
                <i className={getIconClass("Client Name")}></i>{" "}
                {t("clientName")}
              </td>
              <td>{itineraryData.client_name || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <i className={getIconClass("Total Pax")}></i>
                {t("totalPax")}
              </td>
              <td>{itineraryData.total_pax || "N/A"}</td>
              <td>
                <i className={getIconClass("Tour Date")}></i> {t("tourDate")}
              </td>
              <td>{itineraryData.tour_date || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <i className="fas fa-plane-departure ml-1"></i> {t("flight")}
              </td>
              <td>{itineraryData.flight || "N/A"}</td>
              <td>
                <i className={getIconClass("Date of QTN")}></i>
                {t("dateOfQtn")}
              </td>
              <td>{itineraryData.date_of_qtn || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <i className={getIconClass("Itinerary")}></i>
                {t("itinerary")}
              </td>
              <td colSpan="3">{itineraryData.itinerary || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <i className={getIconClass("Validity")}></i> {t("validity")}
              </td>
              <td colSpan="3">{itineraryData.validity || "N/A"}</td>
            </tr>
          </tbody>
        </table>

        <h3>
          <i className="fas fa-route"></i> Itinerary Details
        </h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>{t("day")}</th>
              <th>{t("date")}</th>
              <th>{t("cities")}</th>
              <th>{t("time")}</th>
              <th>{t("service")}</th>
              <th>{t("duration")}</th>
              <th>{t("mode")}</th>
              <th>{t("meal")}</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>
                  <i className={getIconClass("Day")}></i>{" "}
                  {t(service.day) || t("N/A")}
                </td>
                <td>
                  <i className={getIconClass("Tour Date")}></i>{" "}
                  {t(new Date(service.date).toLocaleDateString("ja-JP")) ||
                    t("N/A")}
                </td>
                <td>
                  <i className={getIconClass("City")}></i>{" "}
                  {t(service.city) || t("N/A")}
                </td>
                <td>
                  <i className={getIconClass("Time")}></i>{" "}
                  {t(service.time) || t("N/A")}
                </td>
                <td>
                  <i className={getIconClass("Service")}></i>{" "}
                  {t(service.service) || t("N/A")}
                </td>
                <td>
                  <i className={getIconClass("Duration")}></i>{" "}
                  {t(service.duration) || t("N/A")}
                </td>
                <td>
                  <i className={getIconClass("Mode")}></i>{" "}
                  {t(service.mode) || t("N/A")}
                </td>
                <td>
                  <i className={getIconClass("Meal")}></i>{" "}
                  {t(service.meal) || t("N/A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>
          <i className="fas fa-hotel"></i> Hotels Envisaged
        </h3>
        {hotels.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>
                  <i className="fas fa-city"></i> {t("cities")}
                </th>
                <th>
                  <i className="fas fa-calendar-alt"></i>
                  {t("dates")}
                </th>
                <th>
                  <i className="fas fa-bed"></i> {t("nights")}
                </th>
                <th>
                  <i className="fas fa-hotel"></i>
                  {t("hotel")}
                </th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel, index) => (
                <tr key={index}>
                  <td>{hotel.city || "N/A"}</td>
                  <td>{hotel.dates || "N/A"}</td>
                  <td>{hotel.nights || "N/A"}</td>
                  <td>{hotel.hotel || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hotel details available.</p>
        )}

        <h3>Quotation Slab</h3>
        {quotationSlab.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>
                  <i className="fas fa-sliders-h"></i> {t("slab")}
                </th>
                <th>
                  <i className="fas fa-user-friends"></i> {t("maxPax")}
                </th>
                <th>
                  <i className="fas fa-user-friends"></i> {t("minPax")}
                </th>
                <th>
                  <i className="fas fa-user"></i> {t("noOfFOC")}
                </th>
                <th>
                  <i className="fas fa-dollar-sign"></i> {t("ppCost")}
                </th>
              </tr>
            </thead>
            <tbody>
              {quotationSlab.map((slab, index) => (
                <tr key={index}>
                  <td>{t(slab.slab) || t("N/A")}</td>
                  <td>{t(slab.min_pax) || t("N/A")}</td>
                  <td>{t(slab.max_pax) || t("N/A")}</td>
                  <td>{t(slab.no_of_foc) || t("N/A")}</td>
                  <td>{t(slab.pp_cost) || t("N/A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t("noQuotationSlabDetailsAvailable")}</p>
        )}

        <h3>INCLUSION</h3>
        {Inclusions.length > 0 ? (
          Inclusions.map((item, i) => (
            <p key={i}>
              <i className="fas fa-check"></i> {item}
            </p>
          ))
        ) : (
          <p>No inclusions available.</p>
        )}

        <h3>EXCLUSION</h3>
        {Exclusion.length > 0 ? (
          Exclusion.map((item, i) => (
            <p key={i}>
              <i className="fas fa-times"></i> {item}
            </p>
          ))
        ) : (
          <p>No exclusions available.</p>
        )}
        <h3>TOUR CONDITIONS</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                <i className="bi bi-exclamation-triangle-fill"></i> Condition
              </th>
              <th>
                <i className="bi bi-info-circle-fill"></i> Details
              </th>
            </tr>
          </thead>
          <tbody>
            {tourConditionData.map((condition, index) => (
              <tr key={index}>
                <td>
                  <i className="bi bi-check-circle-fill"></i>{" "}
                  {condition.condition || "N/A"}
                </td>
                <td>
                  <i className="bi bi-file-text-fill"></i>{" "}
                  {condition.detail || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Transportation Rules</h3>
        {TransportaionRules.length > 0 ? (
          TransportaionRules.map((rule, i) => (
            <p key={i}>
              <i className="bi bi-info-circle"></i> {rule}
            </p>
          ))
        ) : (
          <p>
            <i className="bi bi-exclamation-circle"></i> No transportation rules
            available.
          </p>
        )}
        <CityMap cityList={cityList} hotels = {hotels}/>
      </div>
    </div>
  );
};
