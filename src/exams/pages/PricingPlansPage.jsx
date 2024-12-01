import Loading from "../components/atoms/Loading";
import PricingPlansCard from "../components/molecules/pricingplans/PricingPlansCard";
import { useGetAllPackagesQuery } from "../features/packages/packagesApi";

const PricingPlansPage = () => {
  const { data: alllPackages, isLoading } = useGetAllPackagesQuery();

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Package Pricing Plans</h1>
      <p className="text-lg text-center mb-12">
        Choose the package that&apos;s right for you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {
          alllPackages?.data && alllPackages?.data.map((item) => (
            <PricingPlansCard
              key={item?.id}
              singlePackage={item}
            />
          ))
        }
      </div>
    </div>
  );
};

export default PricingPlansPage;
