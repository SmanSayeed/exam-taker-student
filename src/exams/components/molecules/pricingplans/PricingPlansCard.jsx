import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { useState } from "react";
import EnrollmentForm from "./EnrollmentForm.js";

const PricingPlansCard = ({ singlePackage }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isSubscribedToPackage = singlePackage?.is_subscribed || false;

    const handleGetStartedClick = () => {
        setIsDialogOpen(true);
    };

    const handleViewClick = () => {
        // Logic for viewing the subscribed package details
        console.log("Viewing subscribed package:", singlePackage?.name);
    };

    return (
        <>
            <Card className="bg-gradient-to-b from-blue-500 to-gray-500 text-white rounded-xl overflow-hidden shadow-lg">
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
                    <p className="my-3">{parseHtmlContent(singlePackage?.description)}</p>

                    {/* Conditional Button Rendering */}
                    {
                        isSubscribedToPackage ? (
                            <Button
                                className="w-full bg-green-500 text-white hover:bg-green-400"
                                onClick={handleViewClick}
                            >
                                View
                            </Button>
                        ) : (
                            <Button
                                className="w-full bg-gray-300 text-gray-800 hover:bg-gray-200"
                                onClick={handleGetStartedClick}
                            >
                                Get Started
                            </Button>
                        )
                    }
                </div>
            </Card>

            {/* Custom Dialog */}
            <CustomDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                title=""
                description=""
            >
                <h3 className="text-xl font-bold mb-4 flex flex-col md:flex-row justify-center items-center gap-1">
                    Get Started with {parseHtmlContent(singlePackage?.name)}
                </h3>
                <p className="flex flex-col md:flex-row items-center justify-center gap-1">
                    You are about to subscribe to the {parseHtmlContent(singlePackage?.name)} plan for {singlePackage?.price}.
                </p>

                {/* Enrollment Form */}
                <div className="mt-4">
                    <EnrollmentForm
                        singlePackage={singlePackage}
                        onCancel={() => setIsDialogOpen(false)}
                    />
                </div>
            </CustomDialog>
        </>
    );
};

export default PricingPlansCard;
