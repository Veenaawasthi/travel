export const ItineraryFormCpmponent = ({ formState, handleChange }) => {
  return (
    <div id="itineraryForm">
      <div style={containarStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "lightblue",
          }}
        >
          <img
            src={"/Logo RD.jpg"}
            alt={"Logo RD"}
            className="company-logo"
            style={{ maxWidth: "200px", marginRight: "20px" }}
          />
          <h1 style={{ color: "black", fontWeight: "bold" }}>
            Rising Destination
          </h1>
        </div>
        <h2>Experiential Japan Package</h2>
        <div className="form-container">
          <div className="form-row">
            <label htmlFor="filecode" style={labelStyleItenerary}>
              File Code
            </label>
            <input
              type="text"
              id="filecode"
              name="file_code"
              value={formState.file_code}
              onChange={handleChange}
              required
              style={inputStyleItenerary}
            />
          </div>

          <div className="form-row">
            <label htmlFor="validity" style={labelStyleItenerary}>
              Validity:
            </label>
            <input
              type="text"
              id="validity"
              name="validity"
              value={formState.validity}
              onChange={handleChange}
              required
              style={inputStyleItenerary}
            />
          </div>

          <div className="form-row">
            <label htmlFor="clientName" style={labelStyleItenerary}>
              Name:
            </label>
            <input
              type="text"
              id="clientName"
              name="client_name"
              value={formState.client_name}
              onChange={handleChange}
              required
              style={inputStyleItenerary}
            />
          </div>

          <div className="form-row">
            <label htmlFor="itinerary" style={labelStyleItenerary}>
              Itinerary
            </label>
            <input
              type="text"
              id="itinerary"
              name="itinerary"
              value={formState.itinerary}
              onChange={handleChange}
              required
              style={inputStyleItenerary}
            />
          </div>

          <div className="form-table">
            <table style={tableItenerary}>
              <tbody>
                <tr>
                  <td style={tdItenerary}>
                    <label htmlFor="groupName" style={labelStyleItenerary}>
                      Group Name:
                    </label>
                    <input
                      type="text"
                      id="groupName"
                      name="group_name"
                      value={formState.group_name}
                      onChange={handleChange}
                      required
                      style={inputStyleItenerary}
                    />
                  </td>
                  <td style={tdItenerary}>
                    <label htmlFor="totalPax" style={labelStyleItenerary}>
                      Total Pax:
                    </label>
                    <input
                      type="number"
                      id="totalPax"
                      name="total_pax"
                      value={formState.total_pax}
                      onChange={handleChange}
                      required
                      style={inputStyleItenerary}
                    />
                  </td>
                  <td style={tdItenerary}>
                    <label htmlFor="tourDate" style={labelStyleItenerary}>
                      Tour Date:
                    </label>
                    <input
                      type="date"
                      id="tourDate"
                      name="tour_date"
                      value={formState.tour_date}
                      onChange={handleChange}
                      required
                      style={inputStyleItenerary}
                    />
                  </td>
                  <td style={tdItenerary}>
                    <label htmlFor="flight" style={labelStyleItenerary}>
                      Flight:
                    </label>
                    <input
                      type="text"
                      id="flight"
                      name="flight"
                      value={formState.flight}
                      onChange={handleChange}
                      required
                      style={inputStyleItenerary}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" style={tdItenerary}>
                    <label htmlFor="dateOfQtn" style={labelStyleItenerary}>
                      Date of QTN:
                    </label>
                    <input
                      type="date"
                      id="dateOfQtn"
                      name="date_of_qtn"
                      value={formState.date_of_qtn}
                      onChange={handleChange}
                      required
                      style={inputStyleItenerary}
                    />
                  </td>
                  <td colSpan="3" style={tdItenerary}>
                    <label htmlFor="agent" style={labelStyleItenerary}>
                      Agent:
                    </label>
                    <input
                      type="text"
                      id="agent"
                      name="agent"
                      value={formState.agent}
                      onChange={handleChange}
                      required
                      style={inputStyleItenerary}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ItineraryDetailsTable = ({
  formState,
  handleDayChange,
  handleDateChange,
  handleCityChange,
  cityServiceMapping,
  handleDurationChange,
  handleServiceChange,
  removeDay,
  addDay,
}) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={thStyleTable}>Day</th>
          <th style={thStyleTable}>Date</th>
          <th style={thStyleTable}>City</th>
          <th style={thStyleTable}>Time</th>
          <th style={thStyleTable}>Service</th>
          <th style={thStyleTable}>Duration</th>
          <th style={thStyleTable}>Mode</th>
          <th style={thStyleTable}>Meal</th>
          <th style={thStyleTable}>Price</th>
          <th style={thStyleTable}>Action</th>
        </tr>
      </thead>
      <tbody>
        {formState?.days?.map((day, dayIndex) => (
          <tr key={dayIndex}>
            <td style={tdItenerary}>
              <input
                type="text"
                name="day"
                value={day.day}
                onChange={(e) => handleDayChange(dayIndex, e)}
                id="day"
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <input
                type="date"
                name="date"
                value={day.date}
                onChange={(e) => handleDateChange(dayIndex, e)}
                id="date"
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <select
                name="city"
                value={day.city}
                onChange={(e) => handleCityChange(dayIndex, e)}
                style={inputStyleItenerary}
              >
                <option disabled value="">
                  Select A City
                </option>
                {Object.keys(cityServiceMapping || {}).map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </td>
            <td style={tdItenerary}>
              <input
                type="time"
                name="time"
                value={day.time}
                onChange={(e) => handleDayChange(dayIndex, e)}
                id="time"
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <select
                name="service"
                value={day.service}
                onChange={(e) => handleServiceChange(dayIndex, e)}
                style={inputStyleItenerary}
              >
                <option disabled value="">
                  Select A Service
                </option>
                {(day.availableServices || []).map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </td>
            <td style={tdItenerary}>
              <input
                type="number"
                name="duration"
                value={day.duration}
                onChange={(e) => handleDurationChange(dayIndex, e)}
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <input
                type="text"
                name="mode"
                value={day.mode}
                onChange={(e) => handleDayChange(dayIndex, e)}
                id="mode"
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <input
                type="text"
                name="meal"
                value={day.meal}
                onChange={(e) => handleDayChange(dayIndex, e)}
                id="meal"
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <input
                type="text"
                name="price"
                value={day.price}
                readOnly
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <button
                type="button"
                onClick={() => removeDay(dayIndex)}
                style={removeButtonStyle}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="10" style={tdItenerary}>
            <button type="button" onClick={addDay} style={addButtonStyle}>
              + Add Day
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const TotalSeriveTable = ({
  totalPrice,
  totalPax,
  handleTotalPaxChange,
}) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={thStyleTable}>Total Price</th>
          <th style={thStyleTable}>Total Pax</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={thStyleTable}>{totalPrice}</td>
          <td style={thStyleTable}>
            <input
              type="number"
              value={totalPax}
              onChange={handleTotalPaxChange}
              min=""
              style={totalserviceTableInput}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const HotelEnvisagedTable = ({
  formState,
  handleHotelChange,
  removeHotel,
  addHotel,
  cityServiceMapping
}) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={thStyleTable}>City</th>
          <th style={thStyleTable}>Dates</th>
          <th style={thStyleTable}>Nights</th>
          <th style={thStyleTable}>Hotel</th>
          <th style={thStyleTable}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {formState?.hotels?.map((hotel, hotelIndex) => (
          <tr key={hotelIndex}>
            <td style={tdItenerary}>
            <select
                name="city"
                value={hotel.city}
                onChange={(e) => handleHotelChange(hotelIndex, e)}
                id={`city-${hotelIndex}`}
                style={inputStyleItenerary}
              >
                <option disabled value="">
                  Select A City
                </option>
                {Object.keys(cityServiceMapping || {}).map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                name="city"
                value={hotel.city}
                onChange={(e) => handleHotelChange(hotelIndex, e)}
                id={`city-${hotelIndex}`}
                style={inputStyleItenerary}
                placeholder="City"
              /> */}
            </td>
            <td style={tdItenerary}>
              <input
                type="text"
                name="dates"
                value={hotel.dates}
                onChange={(e) => handleHotelChange(hotelIndex, e)}
                id={`dates-${hotelIndex}`}
                style={inputStyleItenerary}
              />
            </td>
            <td style={tdItenerary}>
              <input
                type="text"
                name="nights"
                value={hotel.nights}
                onChange={(e) => handleHotelChange(hotelIndex, e)}
                id={`nights-${hotelIndex}`}
                style={inputStyleItenerary}
                placeholder="Nights"
              />
            </td>
            <td style={tdItenerary}>
              <input
                type="text"
                name="hotel"
                value={hotel.hotel}
                onChange={(e) => handleHotelChange(hotelIndex, e)}
                id={`hotel-${hotelIndex}`}
                style={inputStyleItenerary}
                placeholder="Hotel Name"
              />
            </td>
            <td style={tdItenerary}>
              <button
                type="button"
                onClick={() => removeHotel(hotelIndex)}
                style={removeButtonStyle}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>
            <button type="button" onClick={addHotel} style={addButtonStyle}>
              + Add Hotel
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export const QuotationSlabTable = ({
  quotationSlabs,
  handleQuotationSlabChange,
  removeQuotationSlabRow,
  addQuotationSlabRow,
}) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={thStyleTable}>Slab</th>
          <th style={thStyleTable}>Max Pax</th>
          <th style={thStyleTable}>Min Pax</th>
          <th style={thStyleTable}>No. of FOC</th>
          <th style={thStyleTable}>PP Cost</th>
          <th style={thStyleTable}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {quotationSlabs.map((slab, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                name="slab"
                value={slab.slab}
                onChange={(e) => handleQuotationSlabChange(index, e)}
                style={inputStyleItenerary}
                placeholder="Slab"
              />
            </td>
            <td>
              <input
                type="number"
                name="max_pax"
                value={slab.max_pax}
                onChange={(e) => handleQuotationSlabChange(index, e)}
                style={inputStyleItenerary}
                placeholder="Max Pax"
              />
            </td>
            <td>
              <input
                type="number"
                name="min_pax"
                value={slab.min_pax}
                onChange={(e) => handleQuotationSlabChange(index, e)}
                style={inputStyleItenerary}
                placeholder="Min Pax"
              />
            </td>
            <td>
              <input
                type="number"
                name="no_of_foc"
                value={slab.no_of_foc}
                onChange={(e) => handleQuotationSlabChange(index, e)}
                style={inputStyleItenerary}
                placeholder="No. of FOC"
              />
            </td>
            <td>
              <input
                type="text"
                name="pp_cost"
                value={slab.pp_cost}
                onChange={(e) => handleQuotationSlabChange(index, e)}
                style={inputStyleItenerary}
                placeholder="PP Cost"
              />
            </td>
            <td>
              {quotationSlabs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuotationSlabRow(index)}
                  style={removeButtonStyle}
                >
                  Remove
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">
            <button
              type="button"
              onClick={addQuotationSlabRow}
              style={addButtonStyle}
            >
              + Add Quotation Slab
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export const TermConditionTab = ({ formState, handleChange }) => {
  return (
    <>
      <div className="form-row">
        <label
          htmlFor="inclusions"
          style={labelStyleItenerary}
        >
          Inclusions:
        </label>
        <input
          type="checkbox"
          id="inclusions"
          name="inclusions"
          checked={formState.inclusions}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label
          htmlFor="exclusions"
          style={labelStyleItenerary}
        >
          Exclusions:
        </label>
        <input
          type="checkbox"
          id="exclusions"
          name="exclusions"
          checked={formState.exclusions}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label
          htmlFor="terms"
          style={labelStyleItenerary}
        >
          Terms & Conditions:
        </label>
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={handleChange}
        />
      </div>
    </>
  );
};



const thStyleTable = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};
const totalserviceTableInput = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};
const inputStyleItenerary = {
  width: "calc(100% - 10px)",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

const labelStyleItenerary = {
  fontWeight: "bold",
  marginBottom: "5px",
  display: "inline-block",
};
const tdItenerary = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};
const tableItenerary = {
  width: "100%",
  marginTop: "10px",
  borderCollapse: "collapse",
};
const containarStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};
export const addButtonStyle = {
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};
export const removeButtonStyle = {
  padding: "8px 12px",
  border: "none",
  backgroundColor: "red",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
};
