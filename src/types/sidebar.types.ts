import { ReactNode } from "react";

export type TUserPaths = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPaths[];
};

export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

export type Route = {
  path: string;
  element: ReactNode;
};
