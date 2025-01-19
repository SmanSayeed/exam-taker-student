import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PackageCard } from "@/exams/components/molecules/packages/PackageCard";
import { useGetAllPkgCatsQuery, useGetPkgCatsQuery } from "@/features/categories/categoriesApi";
import { useGetAllPackagesQuery } from "@/features/packages/packagesApi";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import Loading from "../../components/atoms/Loading";

const PackagesPage = () => {
  const { data: allPackages, isLoading } = useGetAllPackagesQuery();
  const { data: pkgCats } = useGetPkgCatsQuery();
  const { data: allPkgCats } = useGetAllPkgCatsQuery();

  const sortedPackages = allPackages?.data?.length > 0
    ? allPackages?.data.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

  // const includedPkgCats = allPkgCats?.data && allPkgCats?.data?.filter(item => item?.additional_package_category);

  // Extract unique additional package categories
  // const uniqueAdditionalPkgCats = includedPkgCats?.reduce((acc, current) => {
  //   const isDuplicate = acc.some(
  //     item => item.id === current.additional_package_category.id
  //   );

  //   if (!isDuplicate) {
  //     acc.push(current.additional_package_category);
  //   }

  //   return acc;
  // }, []);

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

      {/* Tabs for Categories */}
      {
        sortedPackages.length > 0 ? (
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="inline-flex items-center gap-4">
                <TabsTrigger value="all">All</TabsTrigger>
                {
                  allPkgCats?.data && allPkgCats?.data.map((item) => (
                    <TabsTrigger
                      key={item.id}
                      value={item.name}
                    >
                      {parseHtmlContent(item.name)}
                    </TabsTrigger>
                  ))
                }
              </TabsList>
            </div>

            {/* All Packages Tab */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {
                  sortedPackages?.length > 0 ? (
                    sortedPackages.map((item) => (
                      <PackageCard key={item?.id} singlePackage={item} />
                    ))
                  ) : (
                    <p className="col-span-3 text-center text-gray-500">
                      No packages available at the moment.
                    </p>
                  )
                }
              </div>
            </TabsContent>

            {/* Dynamic Category Tabs */}
            {
              allPkgCats?.data && allPkgCats?.data.map((item) => {
                const packagesForAdditionalCats = pkgCats?.data?.filter((pkg) => pkg?.additional_package_category_id === item?.id);

                return (
                  <TabsContent
                    key={`${item?.additional_package_category?.id}-${item?.additional_package_category?.name}`}
                    value={item?.additional_package_category?.name}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                      {
                        packagesForAdditionalCats && (
                          packagesForAdditionalCats.map((pkgItem) => (
                            <PackageCard key={pkgItem.id} singlePackage={pkgItem} />
                          ))
                        )
                      }
                    </div>
                  </TabsContent>
                );
              })
            }
          </Tabs>
        ) : (
          <p className="text-center text-gray-500 text-2xl">No Package Available</p>
        )
      }
    </div >
  );
};

export default PackagesPage;