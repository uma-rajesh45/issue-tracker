import React from "react";
import Pagination from "./components/Pagination";

const IssuesPage = ({searchParams}:{searchParams:{page:string}}) => {

  return <Pagination itemCount={100} currentPage={parseInt(searchParams.page)} pageSize={10}/>;
};

export default IssuesPage;
