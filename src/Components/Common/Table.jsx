import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table table-dark mb-10">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody
        data={data}
        columns={columns}
        // onLike={onLike}
        // onDelete={onDelete}
      />
    </table>
  );
};

export default Table;
