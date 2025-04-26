import type { BasicStatus, PermissionType } from "./enum";

export interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  role?: Role;
  status?: BasicStatus;
  permissions?: Permission[];
}

export interface Organization {
  id: string;
  name: string;
  status: "enable" | "disable";
  desc?: string;
  order?: number;
  children?: Organization[];
}

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  route: string;
  icon?: string;
  component?: string;
  frameSrc?: URL; // 外链
  badge?: number; // 徽标
  children?: Permission[];
  hideInMenu?: boolean; // 是否在菜单隐藏
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}
