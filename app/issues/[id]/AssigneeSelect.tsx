"use client";
import Skeleton from "@/app/components/Skeleton";
import { issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const AssigneeSelect = ({ issue }: { issue: issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;
  const onChangeIssue = (userId: string) => {
    if (userId === "unassign") {
      axios
        .patch("/api/issues/" + issue.id, { assignedToUserId: null })
        .catch(() => {
          toast.error("changes could not be updated :(");
        });
    } else {
      axios
        .patch("/api/issues/" + issue.id, { assignedToUserId: userId })
        .catch(() => {
          toast.error("changes could not be updated :(");
        });
    }
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassign"}
        onValueChange={onChangeIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassign">Unassign</Select.Item>
            {users?.map((user) => (
              <>
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              </>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
