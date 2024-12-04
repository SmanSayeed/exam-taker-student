import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetModelTestsByPkgIdQuery } from "@/features/packages/packagesApi.js";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { useState } from "react";
import { Link } from "react-router-dom";

const PricingPlansCard = ({ singlePackage }) => {
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const isSubscribedToPackage = singlePackage?.is_subscribed || false;

    const { data: modelTestsByPkgId, isLoading, error } = useGetModelTestsByPkgIdQuery(singlePackage?.id);

    const handleViewClick = () => {
        setIsViewDialogOpen(true);
    };

    return (
        <>
            <Card className="bg-gradient-to-b from-blue-500 to-gray-500 text-white rounded-xl overflow-hidden shadow-lg">
                {/* Cover Image Section */}
                {singlePackage?.img && (
                    <div className="relative h-48 w-full">
                        <img
                            src={singlePackage.img}
                            alt={parseHtmlContent(singlePackage.name)}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-6 text-center">
                    {/* Price and Discount */}
                    <div className="bg-white rounded-full mx-auto w-20 h-20 flex items-center justify-center mb-4 relative">
                        <div className="text-center">
                            <span className="text-xl font-bold text-purple-500">
                                ${singlePackage?.discountPrice || singlePackage?.price}
                            </span>
                            {singlePackage?.discountPrice && (
                                <span className="text-sm text-red-500 line-through ml-2">
                                    ${singlePackage.price}
                                </span>
                            )}
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">{parseHtmlContent(singlePackage?.name)}</h2>
                    {/* <p className="my-3">{parseHtmlContent(singlePackage?.description)}</p> */}

                    {/* Conditional Button Rendering */}
                    {isSubscribedToPackage ? (
                        <Button
                            className="w-full bg-green-500 text-white hover:bg-green-400"
                            onClick={handleViewClick}
                        >
                            View Model tests
                        </Button>
                    ) : (
                        <Link
                            to={`/package/${singlePackage?.id}`}
                            className="px-2 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-200"
                        >
                            view Details
                        </Link>
                    )}
                </div>
            </Card>

            {/* View Model Tests Dialog */}
            <CustomDialog
                isOpen={isViewDialogOpen}
                setIsOpen={setIsViewDialogOpen}
            >
                <h1 className="flex flex-col md:flex-row gap-1">
                    Model Tests for {parseHtmlContent(singlePackage?.name)}
                </h1>
                {
                    isLoading ? (
                        <p>Loading model tests...</p>
                    ) : error ? (
                        <p>Error fetching model tests.</p>
                    ) : modelTestsByPkgId?.length > 0 ? (
                        <ul className="space-y-2">
                            {modelTestsByPkgId.map((test) => (
                                <li
                                    key={test.id}
                                    className="bg-gray-100 p-3 rounded-lg text-gray-800 hover:bg-gray-200"
                                >
                                    {test.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No model tests available for this package.</p>
                    )
                }
            </CustomDialog>
        </>
    );
};

export default PricingPlansCard;

