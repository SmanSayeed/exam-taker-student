import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./exams/components/molecules/ui/Footer";
import Navbar from "./exams/components/molecules/ui/Navbar";

function App() {
  return (
    <div className="min-h-screen relative pb-16 ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
