import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from '../../ErrorPage';
import NotFoundPage from "../../NotFoundPage";
import ExamAnswersPageForHistory from "../pages/ExamAnswersPageForHistory";
import ExamHistoryPage from "../pages/ExamHistoryPage";
import ExamOnGoingPage from "../pages/ExamOnGoingPage";
import ExamResultPage from "../pages/ExamResultPage";
import HomPage from "../pages/HomPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ExamStartingPage from './../pages/ExamStartingPage';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomPage />
            },
            {
                path: "/exams-starting",
                element: <ExamStartingPage />
            },
            {
                path: "/exam-on-going",
                element: <ExamOnGoingPage />,
            },
            {
                path: "/exam-result",
                element: <ExamResultPage />
            },
            {
                path: "/exams",
                element: <ExamStartingPage />
            },
            {
                path: "/exam-history",
                element: <ExamHistoryPage />
            },
            {
                path: "/exam-history/:id",
                element: <ExamAnswersPageForHistory />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/registration",
                element: <RegisterPage />
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])

export default Routes