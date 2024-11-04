import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const isLoggedIn = useAuth();

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;