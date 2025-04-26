import { USER_GROUP } from "@/_mock/userManagement/assets";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import IconifyIcon from "@/components/ui/iconify-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import SVGIcon from "@/components/ui/svgIcon";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Select } from "@radix-ui/react-select";
import { CalendarIcon, MoreVerticalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DataTable } from "@/components/data-table";
import { DATA_TABLE } from "@/_mock/userManagement/assets";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { useUserInfoStore } from "@/store/userInfoSlice";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function UserManagement() {
  const [groupList, setGroupList] = useState<{ id: string; label: string }[]>(
    []
  );
  const username = useUserInfoStore((state) => state.userInfo?.username);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    // 通过接口获取用户分组
    setGroupList(USER_GROUP);
  }, []);
  return (
    <>
      <div className="flex justify-between my-5 text-xl font-bold">
        <h2>用户管理</h2>
        <Button className="h-9 text-sm rounded-md">
          <Link
            to={{
              pathname: "/userManagement/addUser",
              search: `?t=${username}`,
            }}
          >
            用户添加
          </Link>
        </Button>
      </div>
      <div className="flex bg-white flex-1 rounded-xl">
        <div className="text-base w-60 p-4">
          <h3>分组管理</h3>
          <section className="flex space-x-2 items-center py-4">
            <section className="relative w-40">
              <Input
                type="text"
                className="h-8 w-40 text-xs rounded-md"
                placeholder="搜索"
              />
              <IconifyIcon
                icon="solar:magnifer-line-duotone"
                size={14}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              ></IconifyIcon>
            </section>
            <Button variant="ghost" size="sm">
              <SVGIcon name="add" size={16} />
            </Button>
          </section>
          <section>
            {groupList.map((item) => (
              <div className="flex items-center justify-between text-sm py-3 pl-9 pr-3 rounded-sm hover:bg-[#F5F6F7] hover:cursor-pointer">
                <span>{item.label}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVerticalIcon size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>编辑</DropdownMenuItem>
                    <DropdownMenuItem>删除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </section>
        </div>
        <Separator orientation="vertical" />
        <div className="text-base p-4 flex-1">
          <h3 className="mb-4">用户列表</h3>
          <section className="flex space-x-4">
            <div className="flex-1 flex items-center space-x-3 text-[#666]">
              <Label htmlFor="username" className="shrink-0">
                用户名称:
              </Label>
              <Input
                id="username"
                type="text"
                className="h-8 w-40 text-xs rounded-md flex-1"
                placeholder="请输入用户名称"
              />
            </div>
            <div className="flex-1 flex items-center space-x-3 text-[#666]">
              <Label htmlFor="status" className="shrink-0">
                用户状态:
              </Label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="normal">正常</SelectItem>
                  <SelectItem value="frozen">冻结</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 flex items-center space-x-3 text-[#666]">
              <Label htmlFor="username" className="shrink-0">
                创建时间:
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "flex-1 flex-row-reverse justify-start font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className=" h-4 w-4" />
                    {date ? format(date, "PPP") : <span></span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </section>
          <section className="flex justify-end space-x-3 mt-4">
            <Button variant="outline">重置</Button>
            <Button>搜索</Button>
          </section>
          <Separator className="my-4" />
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default UserManagement;
