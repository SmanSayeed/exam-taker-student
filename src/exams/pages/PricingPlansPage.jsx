// import Loading from "../components/atoms/Loading";
// import PricingPlansCard from "../components/molecules/pricingplans/PricingPlansCard";
// import { useGetAllPackagesQuery } from "../features/packages/packagesApi";

// const PricingPlansPage = () => {
//   const { data: allPackages, isLoading } = useGetAllPackagesQuery();

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Cover Image Section */}
//       <div
//         className="relative bg-cover bg-center text-white py-16 mb-12"
//         style={{
//           backgroundImage: `url('/path-to-your-cover-image.jpg')`, // Replace with your image path
//         }}
//       >
//         <div className="absolute inset-0 bg-lime-600 opacity-50"></div> {/* Add overlay */}
//         <div className="relative z-10 text-center">
//           <h1 className="text-4xl font-bold mb-4">Package Pricing Plans</h1>
//           <p className="text-lg">Choose the package that&apos;s right for you</p>
//         </div>
//       </div>

//       {/* Pricing Plans Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {allPackages?.data &&
//           allPackages?.data.map((item) => (
//             <PricingPlansCard key={item?.id} singlePackage={item} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default PricingPlansPage;





import Loading from "../components/atoms/Loading";
import PricingPlansCard from "../components/molecules/pricingplans/PricingPlansCard";
import { useGetAllPackagesQuery } from "../features/packages/packagesApi";

const PricingPlansPage = () => {
  const { data: allPackages, isLoading } = useGetAllPackagesQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cover Image Section */}
      <div
        className="relative bg-cover bg-center text-white py-20 mb-8"
        style={{
          backgroundImage: `url('/pricing-cover.png')`, // Replace with your image path
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Add overlay */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Pricing Plans</h1>
          <p className="text-lg mt-2">
            Find the perfect plan that fits your needs and budget.
          </p>
        </div>
      </div>

      {/* Heading and Subheading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Pricing Plans</h2>
        <p className="text-lg text-gray-600">
          Choose the package that&apos;s right for you.
        </p>
      </div>

      {/* Pricing Plans Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allPackages?.data &&
          allPackages?.data.map((item) => (
            <PricingPlansCard key={item?.id} singlePackage={item} />
          ))}
      </div>
    </div>
  );
};

export default PricingPlansPage;
