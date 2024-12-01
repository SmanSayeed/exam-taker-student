import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { useState } from "react";
import EnrollmentForm from "./EnrollmentForm.js";

const PricingPlansCard = ({ singlePackage }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleGetStartedClick = () => {
        setIsDialogOpen(true);
    };

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Card className="bg-gradient-to-b from-blue-500 to-gray-500 text-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 text-center">
                    <div className="bg-white rounded-full mx-auto w-20 h-20 flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-purple-500">
                            ${singlePackage?.price}
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">{parseHtmlContent(singlePackage?.name)}</h2>

                    <p className="my-3">{parseHtmlContent(singlePackage?.description)}</p>

                    <Button
                        className="w-full bg-gray-300 text-gray-800 hover:bg-gray-200"
                        onClick={handleGetStartedClick}
                    >
                        Get Started
                    </Button>
                </div>
            </Card>

            {/* Custom Dialog */}
            <CustomDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                title=""
                description=""
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 flex justify-center gap-1">
                        Get Started with {parseHtmlContent(singlePackage?.name)}
                    </h3>
                    <p className="flex justify-center gap-1">
                        You are about to subscribe to the {parseHtmlContent(singlePackage?.name)} plan for {singlePackage?.price}.
                    </p>

                    {/* Enrollment Form */}
                    <div className="mt-4">
                        <EnrollmentForm
                            singlePackage={singlePackage}
                            onSubmitSuccess={handleFormSuccess}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    </div>
                </div>
            </CustomDialog>
        </>
    );
};

export default PricingPlansCard;