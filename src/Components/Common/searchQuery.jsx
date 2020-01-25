import React from "react";
const SearchQuery = ({ value, onChange }) => {
  return (
    <input
      onChange={e => onChange(e.currentTarget.value)}
      value={value}
      placeholder="Search...."
      type="text"
      className="form-control my-3"
    />
  );
};

export default SearchQuery;
