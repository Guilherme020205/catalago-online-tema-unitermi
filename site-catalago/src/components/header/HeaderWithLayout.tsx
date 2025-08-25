import { Outlet } from "react-router-dom";
import Header from "./index";

const HeaderWithLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />   
      </main>
    </>
  );
};

export default HeaderWithLayout;
