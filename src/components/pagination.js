import React from "react";
import lodash from "lodash";

//borrowed some code from Code with Mosh React Tutorial with the exception of the li prev and next.
const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  //console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = lodash.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item" onClick={() => { if (currentPage > 1) onPageChange(currentPage - 1)}}>
          Prev
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item" onClick={() => {if(pagesCount > currentPage) onPageChange(currentPage + 1)}}>
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
