/* eslint-disable @next/next/no-async-client-component */
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "../issues/IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";
interface Props {
  searchParams:IssueQuery
}

const Home = async ({searchParams}:Props) => {
  const page = parseInt(searchParams.page)||1;
  const pageSize = 10;
  
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status:undefined;
  const orderBy = columnNames.includes(searchParams.orderBy) ? {[searchParams.orderBy]:"asc"}:undefined;
  const issues = await prisma.issue.findMany({where:{
    status
  },
  orderBy,
  skip:(page-1)*pageSize,
  take:pageSize
});
 
const issueCount = await prisma.issue.count({where:{status}})
 
  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount}/>
    </div>
  );
};
export const dynamic = 'force-dynamic'
export const metadata : Metadata ={
  title:'Total Issues',
  description:"The total issues are specified here"
}
export default Home;
