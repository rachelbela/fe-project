import useSWR from "swr";
import { getTableList } from "@/api";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
function Workbench() {
  const { data, error, isLoading } = useSWR("/api/list", getTableList);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          {error ? (
            <div>failed to load</div>
          ) : isLoading ? (
            <div>loading</div>
          ) : (
            <DataTable data={data!} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Workbench;
