import React from "react";
import Pagination from "./components/Pagination";

const IssuesPage = () => {
  return <Pagination itemCount={100} currentPage={1} pageSize={10}/>;
};

export default IssuesPage;
