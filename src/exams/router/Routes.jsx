import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../../ErrorPage";
import NotFoundPage from "../../NotFoundPage";
import ExamAnswersPageForHistory from "../pages/ExamAnswersPageForHistory";
import ExamHistoryPage from "../pages/ExamHistoryPage";
import ExamOnGoingPage from "../pages/ExamOnGoingPage";
import ExamResultPage from "../pages/ExamResultPage";
import LoginPage from "../pages/LoginPage";
import PackageDetailsPage from "../pages/PackageDetailsPage";
import PricingPlansPage from "../pages/PricingPlansPage";
import QuestionListForStudentPage from "../pages/QuestionListForStudentPage";
import RegisterPage from "../pages/RegisterPage";
import StudentProfilePage from "../pages/StudentProfilePage";
import ExamStartingPage from "./../pages/ExamStartingPage";
import PrivateRoutes from "./PrivateRoutes";
import PdfViewerPage from "../pages/PdfViewerPage";

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
        path: "/registration",
        element: <RegisterPage />,
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
        path: "/questions",
        element: <QuestionListForStudentPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <StudentProfilePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/package",
        element: <PricingPlansPage />,
      },
      {
        path: "/package/:id",
        element: <PackageDetailsPage />,
      },
      {
        path: "pdf",
        element: <PdfViewerPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Routes;
