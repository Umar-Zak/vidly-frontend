import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
const Pagination = ({ count, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(count / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;
  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
              onClick={() => onPageChange(page)}
            >
              <a className="page-link">{page}</a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  count: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired
};

export default Pagination;
