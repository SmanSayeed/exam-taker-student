import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../../ErrorPage";
import NotFoundPage from "../../NotFoundPage";
import BuyQuotaPage from "../pages/BuyQuotaPage";
import ExamAnswersPageForHistory from "../pages/ExamAnswersPageForHistory";
import ExamHistoryPage from "../pages/ExamHistoryPage";
import ExamOnGoingPage from "../pages/ExamOnGoingPage";
import ExamResultPage from "../pages/ExamResultPage";
import LoginPage from "../pages/LoginPage";
import { MTDetailsPage } from "../pages/packages/MTDetailsPage";
import MTExamOnGoingPage from "../pages/packages/MTExamOnGoingPage";
import MTExamResultPage from "../pages/packages/MTExamResultPage";
import MTExamViewSubmissionPage from "../pages/packages/MTExamViewSubmissionPage";
import PackageDetailsPage from "../pages/packages/PackageDetailsPage";
import PackagesPage from "../pages/packages/PackagesPage";
import QuestionListForStudentPage from "../pages/QuestionListForStudentPage";
import RegisterPage from "../pages/RegisterPage";
import StudentProfilePage from "../pages/StudentProfilePage";
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
        element: (
          <PackagesPage />
        ),
      },
      {
        path: "/package/:id",
        element: <PackageDetailsPage />,
      },
      {
        path: "buy-quota",
        element: (
          <PrivateRoutes>
            <BuyQuotaPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/package/:packageId/model-test/:modelTestId",
        element: (
          <PrivateRoutes>
            <MTDetailsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/package/:packageId/model-test/:modelTestId/exam-ongoing/:examId",
        element: (
          <PrivateRoutes>
            <MTExamOnGoingPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/model-test/:modelTestId/mtexam-result",
        element: (
          <PrivateRoutes>
            <MTExamResultPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/model-test/:modelTestId/mtexam-result/:examId",
        element: (
          <PrivateRoutes>
            <MTExamViewSubmissionPage />
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
