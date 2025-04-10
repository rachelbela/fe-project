import useSWR from "swr";
import { getTableList } from "@/api";
import { DataTable } from "@/components/data-table";
import { useUserInfoStore } from "@/store/userInfoSlice";
function TalkLibrary() {
  const { data, error, isLoading } = useSWR("/api/list", getTableList);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  console.log("TalkLibrary userinfo==", userInfo);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
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

export default TalkLibrary;
