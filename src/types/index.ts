import { RoleTypeMap } from "@/config/role";

export interface UserInfo {
  username: string;
  email: string;
  avatar: string;
  token: string;
  role: RoleTypeMap;
}
