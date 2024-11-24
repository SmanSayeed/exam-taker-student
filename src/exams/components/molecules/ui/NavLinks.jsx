import { BookOpen, Home, List, NotebookPen } from "lucide-react";

export const NavLinks = [
    {
        title: "Home",
        href: "/",
        icon: <Home />,
    },
    {
        title: "Exams",
        href: "/exams-starting",
        icon: <NotebookPen />,
    },
    {
        title: "Question Bank",
        href: "/questions",
        icon: <List />,
    },
    {
        title: "Course",
        href: "https://loopsexam.xyz/courses",
        icon: <BookOpen />,
    },
];
