"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import router from "next/router";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { EmptyState } from "@/components/empty-state";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
    <DataTable
      data={data}
      columns={columns}
      onRowClick={(row) => router.push(`/agents/${row.id}`)}
    />

    {data.length === 0 && (
      <EmptyState
        title="Create your first agent"
        description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
      />
    )}
  </div>;
};

export default AgentsView;

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a fews seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"
    />
  );
};
