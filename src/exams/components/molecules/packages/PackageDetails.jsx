import { useGetModelTestsByPkgIdQuery } from "@/features/packages/packagesApi";
import Loading from "../../atoms/Loading";
import { ModelTestCard } from "./ModelTestCard";

export function PackageDetails({ singlePackage, packageId }) {
    const { data: mtUnderPkg, isLoadingMT } = useGetModelTestsByPkgIdQuery(packageId);

    const isSubscribed = singlePackage?.is_subscribed;

    if (isLoadingMT) <Loading />;

    return (
        <div>
            {/* Package Description */}
            <p
                className="text-gray-600 text-lg leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: singlePackage.description }}
            />

            {/* Model Test List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mtUnderPkg?.data && mtUnderPkg?.data.map((singleMT) => (
                    <ModelTestCard
                        key={singleMT?.id}
                        singleMT={singleMT}
                        isSubscribed={isSubscribed}
                        packageId={singlePackage?.id}
                    />
                ))}
            </div>

            {/* Conditional Rendering for Exam Access */}
            {isSubscribed ? (
                <div className="mt-6 text-center text-green-600 font-semibold">
                    You have access to the exam list for this package.
                </div>
            ) : (
                <div className="mt-6 text-center text-red-600 font-semibold">
                    Subscribe to access the exams for this package.
                </div>
            )}
        </div>
    );
}

