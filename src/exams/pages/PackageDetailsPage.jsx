import { useGetSinglePackageQuery } from "@/features/packages/packagesApi";
import { useParams } from "react-router-dom";
import Loading from "../components/atoms/Loading";
import { PackageDetails } from "../components/molecules/packages/PackageDetails";
import { SubscriptionCard } from "../components/molecules/packages/SubscriptionCard";

export default function PackageDetailsPage() {
    const { id: packageId } = useParams();
    const { data: singlePackage, isLoading } = useGetSinglePackageQuery(packageId);

    if (isLoading) {
        return <Loading />;
    }

    if (!singlePackage?.data) {
        return <ErrorScreen />;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Section: Package Details */}
                <div className="md:col-span-8">
                    <PackageDetails singlePackage={singlePackage.data} />
                </div>

                {/* Right Section: Subscription Card */}
                <div className="md:col-span-4">
                    <SubscriptionCard
                        singlePackage={singlePackage?.data}
                    />
                </div>
            </div>
        </div>
    );
}

function ErrorScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
            <p className="text-xl font-semibold text-red-600 mb-2">
                Oops! Unable to load package details.
            </p>
            <p className="text-gray-600">
                There seems to be an issue fetching the package data. Please check your connection or try refreshing the page.
            </p>
            <button
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
                onClick={() => window.location.reload()}
            >
                Refresh Page
            </button>
        </div>
    );
}
