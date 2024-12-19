import { CustomDialog } from "@/components/custom-dialog.jsx";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import EnrollmentForm from "./EnrollmentForm.js";

export function SubscriptionCard({ singlePackage }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const discount = 100; // Example discount value.

    return (
        <>
            <Card className="container">
                {singlePackage?.img ? (
                    <img
                        src={singlePackage?.img}
                        alt="Package Thumbnail"
                        className="rounded-t-md w-full h-60 object-cover"
                    />
                ) : (
                    <div className="bg-gray-200 rounded-t-md w-full h-60 flex items-center justify-center">
                        <p className="text-gray-500">No Image Available</p>
                    </div>
                )}

                <CardContent>
                    <h1
                        className="my-2 text-indigo-700 text-xl font-semibold"
                        dangerouslySetInnerHTML={{ __html: singlePackage?.name }}
                    />

                    <div className="py-4 flex items-center justify-start gap-4">
                        <span className="text-gray-700 text-lg">Price:</span>
                        <div className="text-xl font-bold text-purple-600">
                            ৳{discount || singlePackage?.price}
                        </div>
                        {discount && (
                            <div className="text-sm text-red-500 line-through">
                                ৳{singlePackage?.price}
                            </div>
                        )}
                    </div>

                    {
                        !singlePackage?.is_subscribed ? (
                            <button
                                className="mt-4 w-full px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Subscribe Now
                            </button>
                        ) : (
                            <p className="mt-4 w-full px-6 py-2 bg-green-500 text-white rounded-md shadow-md text-center">
                                Subscribed
                            </p>
                        )
                    }
                </CardContent>
            </Card>

            {/* Enrollment Dialog */}
            <CustomDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                title=""
                description=""
            >
                <div className="mt-4">
                    <EnrollmentForm
                        singlePackage={singlePackage}
                        onCancel={() => setIsDialogOpen(false)}
                    />
                </div>
            </CustomDialog>
        </>
    );
}
