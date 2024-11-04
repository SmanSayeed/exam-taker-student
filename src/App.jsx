import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./exams/components/molecules/ui/Footer";
import Navbar from "./exams/components/molecules/ui/Navbar";

function App() {
  const location = useLocation();
  const noHeaderOrFooter = location.pathname.includes("exam-on-going");

  return (
    <div className="min-h-screen relative pb-16 font-hind-siliguri " >
      <Navbar />
      <Outlet />
      {noHeaderOrFooter || <Footer />}
    </div>
  );
}
export default App;