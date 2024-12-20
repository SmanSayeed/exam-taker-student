import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { Link } from "react-router-dom";

const PricingPlansCard = ({ singlePackage }) => {
    const discountPrice = 100; // examlple discount
    const packageTags = ["Best Seller", "New", "Discounted"];
    const isSubscribed = singlePackage?.is_subscribed;

    const baseURL = "https://loopsexam.xyz";
    const imageURL = `${baseURL}${singlePackage.img}`;

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
                singlePackage?.img ? (
                    <div className="relative h-48 w-full bg-inherit">
                        <img
                            src={imageURL}
                            alt={parseHtmlContent(singlePackage.name)}
                            className="w-full h-full object-cover"
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
                            ${discountPrice || singlePackage?.price}
                        </span>
                        {discountPrice && (
                            <span className="text-sm text-red-500 line-through ml-2">
                                ${singlePackage.price}
                            </span>
                        )}
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">{parseHtmlContent(singlePackage?.name)}</h2>

                <Link
                    to={`/package/${singlePackage?.id}`}
                    className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-200"
                >
                    view Details
                </Link>
            </div>

            {isSubscribed && (
                <Badge variant="green" className="absolute top-1 right-1">
                    Subscribed
                </Badge>
            )}
        </Card>
    );
};

export default PricingPlansCard;