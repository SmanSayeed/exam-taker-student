import { useGetAllPackagesQuery } from "@/features/packages/packagesApi";
import Loading from "../components/atoms/Loading";
import PricingPlansCard from "../components/molecules/packages/PricingPlansCard";

const PricingPlansPage = () => {
  const { data: allPackages, isLoading } = useGetAllPackagesQuery();

  // Filter for active packages
  // const activePackages = allPackages?.data && allPackages?.data?.filter((pkg) => pkg.is_active === 1);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cover Image Section */}
      <div
        className="relative bg-cover bg-center text-white py-20 mb-8"
        style={{
          backgroundImage: `url('/pricing-cover.png')`,
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

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Pricing Plans</h2>
        <p className="text-lg text-gray-600">
          Choose the package that&apos;s right for you.
        </p>
      </div>

      {/* Pricing Plans Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {
          allPackages?.data && allPackages?.data?.length > 0 ? (
            allPackages?.data.map((item) => (
              <PricingPlansCard key={item?.id} singlePackage={item} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No active packages available at the moment.
            </p>
          )
        }
      </div>
    </div>
  );
};

export default PricingPlansPage;
