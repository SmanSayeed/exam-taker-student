import { Badge } from "@/components/ui/badge";
import { useGetSinglePackageQuery, useGetSingleStuResultQuery } from "@/features/packages/packagesApi";
import { useSelector } from "react-redux";

export const MTExamHeader = ({ title, modelTestId, packageId }) => {
    const { data: singlePackage } = useGetSinglePackageQuery(packageId);
    const isSubscribed = singlePackage?.data?.is_subscribed;

    const auth = useSelector(state => state.auth);
    const { data: studentResultData } = useGetSingleStuResultQuery({ modelTestId: modelTestId, studentId: auth.student.id });
    const { student_result } = studentResultData?.message || {};

    return (
        <>
            {
                isSubscribed && (
                    <header className="bg-white shadow w-full px-6 py-4">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                            {
                                student_result && (
                                    <Badge variant="outline" className="text-xl font-bold text-gray-800 flex gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy mr-1 h-5 w-5" data-sentry-element="Trophy" data-sentry-source-file="page.tsx"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                                        Rank: #{student_result?.merit_rank}
                                    </Badge>
                                )
                            }
                        </div>
                    </header>
                )
            }
        </>
    );
}
