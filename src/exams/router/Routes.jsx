import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../../ErrorPage";
import NotFoundPage from "../../NotFoundPage";
import ExamAnswersPageForHistory from "../pages/ExamAnswersPageForHistory";
import ExamHistoryPage from "../pages/ExamHistoryPage";
import ExamOnGoingPage from "../pages/ExamOnGoingPage";
import ExamResultPage from "../pages/ExamResultPage";
import LoginPage from "../pages/LoginPage";
import ExamStartingPage from "./../pages/ExamStartingPage";
import StudentProfilePage from "../pages/StudentProfilePage"; // Import the profile page
import PrivateRoutes from "./PrivateRoutes";
import QuestionListForStudentPage from "../pages/QuestionListForStudentPage";



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/exams-starting",
        element: <ExamStartingPage />,
      },
      {
        path: "/exam-on-going",
        element: <ExamOnGoingPage />,
      },
      {
        path: "/exam-result",
        element: <ExamResultPage />,
      },
      {
        path: "/exams",
        element: <ExamStartingPage />,
      },
      {
        path: "/exam-history",
        element: <ExamHistoryPage />,
      },
      {
        path: "/exam-history/:id",
        element: <ExamAnswersPageForHistory />,
      },
      {
        path: "/questions",
        element: <QuestionListForStudentPage />,
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
