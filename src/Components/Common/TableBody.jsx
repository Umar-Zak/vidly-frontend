import React, { Component } from "react";
import _ from "lodash";
import { getCurrentUser } from "../../services/authService";
class TableBody extends Component {
  user = getCurrentUser();
  renderCell = (item, column) => {
    if (column.content)
      return column.content(item, this.user || { isAdmin: false });
    return _.get(item, column.path);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={item.id + (column.path || column.key)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
