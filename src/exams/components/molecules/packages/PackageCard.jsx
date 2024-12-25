import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { Link } from "react-router-dom";

export const PackageCard = ({ singlePackage }) => {
    const {
        id: packageId,
        name,
        description,
        price,
        duration_days,
        img: pkgImg,
        is_active,
        discount,
        discount_type,
        is_subscribed: isSubscribed,
    } = singlePackage || {};

    const packageTags = ["Best Seller", "New", "Discounted"];

    const baseURL = "https://loopsexam.xyz";
    const imageURL = `${baseURL}${pkgImg}`;

    const discountedPrice =
        discount && discount_type === "percentage"
            ? price - price * (discount / 100)
            : discount && discount_type === "amount"
                ? price - discount
                : price;

    return (
        <Card className="relative bg-gradient-to-b from-blue-500 to-gray-500 text-white rounded-xl overflow-hidden shadow-lg">
            {/* Highlighted Tags Section */}
            {packageTags.length > 0 && (
                <div className="flex gap-2 absolute z-10">
                    {packageTags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full shadow-md font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Cover Image Section */}
            {
                pkgImg ? (
                    <div className="relative bg-inherit">
                        <img
                            src={imageURL}
                            alt={parseHtmlContent(name)}
                            className="w-full h-48"
                        />
                    </div>
                ) : (
                    <div className="bg-gray-200 relative h-48 w-full rounded-t-md flex items-center justify-center">
                        <p className="text-gray-500">No Image Available</p>
                    </div>
                )
            }

            <div className="p-6 text-center">
                {/* Price and Discount */}
                <div className="bg-white rounded-full mx-auto w-24 h-24 flex items-center justify-center mb-4 relative">
                    <div className="text-center">
                        <span className="text-xl font-bold text-purple-500">
                            ৳{discountedPrice || price}
                        </span>
                        {discount && (
                            <span className="text-sm text-red-500 line-through ml-2">
                                ৳{price}
                            </span>
                        )}
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">{parseHtmlContent(name)}</h2>

                <Link
                    to={`/package/${packageId}`}
                    className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-200"
                >
                    view Details
                </Link>
            </div>

            {isSubscribed && (
                <Badge className="absolute top-0 py-1 text-black bg-green-500 right-1 z-10">
                    Subscribed
                </Badge>
            )}
        </Card>
    );
};

