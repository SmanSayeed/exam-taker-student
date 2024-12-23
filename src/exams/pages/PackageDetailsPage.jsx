import { ErrorScreen } from "@/components/error-screen";
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
                    <PackageDetails
                        singlePackage={singlePackage.data}
                        packageId={packageId}
                    />
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
