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
                {
                    mtUnderPkg?.data && mtUnderPkg?.data.length > 0 ? (
                        mtUnderPkg?.data.map((singleMT) => (
                            <ModelTestCard
                                key={singleMT?.id}
                                singleMT={singleMT}
                                isSubscribed={isSubscribed}
                                packageId={singlePackage?.id}
                            />
                        ))
                    ) : (
                        <div className="text-center text-red-600 font-semibold">
                            No Model Tests available for this package.
                        </div>
                    )
                }
            </div>
        </div>
    );
}

