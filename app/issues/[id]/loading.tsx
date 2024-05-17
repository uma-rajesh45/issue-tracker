import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Flex, Heading,Card } from "@radix-ui/themes";
import Skeleton from '@/app/components/Skeleton'

const LoadingTheIssue = () => {
  return (
    <div className="max-w-xl">
      <Heading><Skeleton className="max-w-xl"/></Heading>
      <Flex gap="3" my="3" className="items-center">
       <Skeleton width="5rem"/>
        <Skeleton width="5rem"/>
      </Flex>
      <Card className="prose mt-5">
       <Skeleton count={3}/>
      </Card>
    </div>
  );
};

export default LoadingTheIssue;
