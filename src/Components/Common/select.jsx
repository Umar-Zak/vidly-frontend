import React from "react";
const Select = ({ error, value, options, name, onChange, label }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        name={name}
        id=""
        value={value}
        className="form-control"
      >
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger"></div>}
    </div>
  );
};

export default Select;
