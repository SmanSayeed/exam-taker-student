import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
            <Card className="container">
                <CardHeader>
                    <h2 className="text-xl font-semibold">{parseHtmlContent(singlePackage?.name)}</h2>
                    <p className="text-2xl font-bold">{singlePackage?.price}$</p>
                </CardHeader>
                <CardContent>
                    <p>{parseHtmlContent(singlePackage?.description)}</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleGetStartedClick}>
                        Get Started
                    </Button>
                </CardFooter>
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
