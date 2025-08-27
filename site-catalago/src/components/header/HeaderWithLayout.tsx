import { Outlet } from "react-router-dom";
import Header from "./index";
import Footer from "../footer";

const HeaderWithLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HeaderWithLayout;
