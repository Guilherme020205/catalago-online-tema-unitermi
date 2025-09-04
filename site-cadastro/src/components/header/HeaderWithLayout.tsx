import { Outlet } from "react-router-dom";
import Header from "./index";

const HeaderWithLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main> 
    </div>
  );
};

export default HeaderWithLayout;
