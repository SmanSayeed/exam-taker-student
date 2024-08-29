import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/molecules/Navbar";
import Footer from "../components/molecules/Footer";
import { Toaster } from './../../components/ui/sonner'

const MainLayout = () => {
  const location = useLocation();
  // const noHeaderFooter =
  //   location.pathname.includes("login") ||
  //   location.pathname.includes("registration")
  
  return (
    <div>
      {/* {noHeaderFooter || <Navbar />} */}
      <Navbar />
      <Outlet /> 
      {/* {noHeaderFooter || <Footer />} */}
      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  );
};
export default MainLayout;