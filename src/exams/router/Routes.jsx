import { createBrowserRouter } from "react-router-dom";
import HomPage from "../pages/HomPage";
import ErrorPage from '../../ErrorPage';
import NotFoundPage from "../../NotFoundPage";
import App from "../../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ExamPage from './../pages/ExamPage';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element:<HomPage />
            },
            {
                path: "/exams",
                element:<ExamPage />
            },
            {
                path: "/login",
                element:<LoginPage />
            },
            {
                path: "/registration",
                element:<RegisterPage />
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])

export default Routes