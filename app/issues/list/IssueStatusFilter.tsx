"use client";
import { issue, Status } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (status === " ") {
          const query =params.size ? "?"+params.toString(): "";
          router.push("/issues" + query);
        } else {
          params.append("status", status);

          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues" + query);
        }
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={uuidv4()} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
