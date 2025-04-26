import { faker } from "@faker-js/faker";

export const USER_GROUP = [
  {
    id: "1",
    label: "全部用户",
  },
  {
    id: "2",
    label: "未分组用户",
  },
  {
    id: "3",
    label: "建材大区",
  },
  {
    id: "4",
    label: "生鲜大区",
  },
  {
    id: "5",
    label: "茶饮大区",
  },
];

export const DATA_TABLE = new Array(100).fill(0).map((_, index) => ({
  id: `${index}`,
}));
