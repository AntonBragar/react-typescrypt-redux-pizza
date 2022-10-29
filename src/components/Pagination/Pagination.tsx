import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type IPagination = {
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<IPagination> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={6}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Pagination;
