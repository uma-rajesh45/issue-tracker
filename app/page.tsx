import React from "react";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const close = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueChart open={open} closed={close} inProgress={inProgress} />
        <IssueSummary closed={close} inProgress={inProgress} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default IssuesPage;
