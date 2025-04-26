import SVGIcon from "@/components/ui/svgIcon";

function UserAdd() {
  return (
    <div className="w-4/5 mx-auto">
      <h3 className="flex space-x-0.5 items-center">
        <SVGIcon name="back" size={20}></SVGIcon>
        <span className="text-xl font-bold leading-6">用户添加</span>
      </h3>
    </div>
  );
}

export default UserAdd;
