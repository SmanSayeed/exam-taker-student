import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../../ErrorPage";
import NotFoundPage from "../../NotFoundPage";
import ExamAnswersPageForHistory from "../pages/ExamAnswersPageForHistory";
import ExamHistoryPage from "../pages/ExamHistoryPage";
import ExamOnGoingPage from "../pages/ExamOnGoingPage";
import ExamResultPage from "../pages/ExamResultPage";
import HomPage from "../pages/HomPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentProfilePage from "../pages/StudentProfilePage"; // Import the profile page
import ExamStartingPage from "./../pages/ExamStartingPage";
import PrivateRoutes from "./PrivateRoutes";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomPage />,
      },
      {
        path: "/exams-starting",
        element: (
          <PrivateRoutes>
            <ExamStartingPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/exam-on-going",
        element: (
          <PrivateRoutes>
            <ExamOnGoingPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/exam-result",
        element: (
          <PrivateRoutes>
            <ExamResultPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/exams",
        element: <ExamStartingPage />,
      },
      {
        path: "/exam-history",
        element: (
          <PrivateRoutes>
            <ExamHistoryPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/exam-history/:id",
        element: (
          <PrivateRoutes>
            <ExamAnswersPageForHistory />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegisterPage />,
      },
      {
        path: "/profile", // Profile route with PrivateRoutes
        element: (
          <PrivateRoutes>
            <StudentProfilePage />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Routes;
