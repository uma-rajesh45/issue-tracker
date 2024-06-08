/* eslint-disable @next/next/no-async-client-component */
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import {IssueStatusBadge,Link} from "../components/index";
import IssueActions from "../issues/IssueActions";
import { issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
interface Props {
  searchParams:{status:Status,orderBy:keyof issue,page:string}
}

const Home = async ({searchParams}:Props) => {
  const page = parseInt(searchParams.page)||1;
  const pageSize = 10;
  const columns:{
    label:string;
    value:keyof issue;
    className?:string
   }[] = [
    {label:"Issue",value:"title"},
    {label:"Status",value:"status",className:"hidden md:table-cell"},
    {label:"CreatedAt",value:"createdAt",className:"hidden md:table-cell"}
   ]
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status:undefined;
  const orderBy = columns.map((column)=>column.value).includes(searchParams.orderBy) ? {[searchParams.orderBy]:"asc"}:undefined;
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
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column)=>(
               <Table.ColumnHeaderCell key={column.value} className={column?.className}>
               <NextLink href={{
                query:{
                    ...searchParams,orderBy:column.value
                }
               }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
               </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                {issue.title}

                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount}/>
    </div>
  );
};
export const dynamic = 'force-dynamic'
export default Home;
