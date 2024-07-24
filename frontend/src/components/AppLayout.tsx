import { FC } from "react";
import { Outlet } from "react-router-dom";

interface AppLayoutProps {}

const AppLayout: FC<AppLayoutProps> = () => {
  return (
    <div className="flex">
      <Outlet />
    </div>
  );
};

export default AppLayout;
