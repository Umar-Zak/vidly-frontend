import React, { Component } from "react";

class TableHeader extends Component {
  //sortColumn
  //onSort
  //columns

  renderSort = column => {
    const { sortColumn } = this.props;
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.key || column.path}
              className="cickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSort(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
