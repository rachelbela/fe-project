import { useUserInfoStore } from "@/store/userInfoSlice";
function TalkLibrary() {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  console.log("TalkLibrary userinfo==", userInfo);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          this is talk library
        </div>
      </div>
    </div>
  );
}

export default TalkLibrary;
