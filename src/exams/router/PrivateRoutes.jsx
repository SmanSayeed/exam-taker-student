import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ExamStartingPage from "../pages/ExamStartingPage";


const PrivateRoutes = () => {
    const isLoggedIn = useAuth();

    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        <ExamStartingPage />
                    </>
                ) : (
                    <Navigate to="/login" />
                )
            }
        </>
    );
};

export default PrivateRoutes;

