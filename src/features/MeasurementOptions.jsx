import { useQuery } from "@tanstack/react-query";
import { getMeasurements } from "../api/customers";
import { useState } from "react";
import "./css/MeasurementOptions.css";

export default function MeasurementOptions({
  customerId,
  measurementId,
  onMeasurementChange,
  selectedOpt,
}) {
  const {
    data: measurements = [],
    error,
    isLoading,
  } = useQuery({
    querykey: ["measurements"],
    queryFn: () => getMeasurements(customerId),
  });

  return (
    <div className="form-group pp">
      <label>Measurement Option:</label>
      <select
        name="measurementId"
        value={measurementId}
        onChange={(e) => {
          const selectedMeasurement = measurements.find(
            (m) => m.category === e.target.value
          );
          onMeasurementChange(e, selectedMeasurement);
        }}
      >
        <option value="">Select</option>
        <option value="new">➕ Add New</option>
        {measurements.map((eachObj) => (
          <option key={eachObj.category} value={eachObj.category}>
            {eachObj.category}
          </option>
        ))}
      </select>
      {selectedOpt ? (
        <ShowCaseMeasurement data={measurements} selectedOpt={selectedOpt} />
      ) : null}
    </div>
  );
}

function ShowCaseMeasurement({ data, selectedOpt }) {
  return (
    <>
      {data.map((eachObj) => (
        <div className="showcase--measurement" key={eachObj.id}>
          {eachObj.category === selectedOpt ? (
            <>
              <h4>{eachObj.category}</h4>
              <ul>
                {Object.entries(eachObj.data).map(([key, value]) => (
                  <li key={`${eachObj.id}-${key}`}>
                    <span>{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
}
