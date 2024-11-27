import { BookOpen, Home, List, NotebookPen } from "lucide-react";

export const NavLinks = [
    {
        title: "Home",
        href: "https://loopsexam.xyz",
        icon: <Home size={20} />,
    },
    {
        title: "Exams",
        href: "/exams-starting",
        icon: <NotebookPen size={20} />,
    },
    {
        title: "Question Bank",
        href: "/questions",
        icon: <List size={20} />,
    },
    {
        title: "Course",
        href: "https://loopsexam.xyz/courses",
        icon: <BookOpen size={20} />,
    },
];
