import React from "react";
import lodash from "lodash";

//borrowed code from Code with Mosh React Tutorial
const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  //console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = lodash.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={ page === currentPage ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick= {() => onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
