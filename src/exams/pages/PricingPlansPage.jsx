// import { useGetAllPackagesQuery } from "@/features/packages/packagesApi";
// import { useSelector } from "react-redux";
// import Loading from "../components/atoms/Loading";
// import PricingPlansCard from "../components/molecules/packages/PricingPlansCard";

// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { useGetCategoryQuery } from "@/features/categories/categoriesApi";

// const PricingPlansPage = () => {
//   const { data: allPackages, isLoading } = useGetAllPackagesQuery();
//   const auth = useSelector(state => state.auth);

//   // Filter packages based on student section_id or show all packages if section_id is missing
//   const filteredPackages = allPackages?.data?.filter((pkg) =>
//     !auth?.student?.section_id || pkg?.section_id === auth.student.section_id
//   );

//   const sortedPackages = filteredPackages?.length > 0
//     ? filteredPackages.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     : [];

//   const { data: allSections } = useGetCategoryQuery("sections");

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Cover Image Section */}
//       <div
//         className="relative bg-cover bg-center text-white py-20 mb-8"
//         style={{
//           backgroundImage: `url('/pricing-cover.png')`,
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div> {/* Add overlay */}
//         <div className="relative z-10 text-center">
//           <h1 className="text-4xl font-bold">Welcome to Our Pricing Plans</h1>
//           <p className="text-lg mt-2">
//             Find the perfect plan that fits your needs and budget.
//           </p>
//         </div>
//       </div>

//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-bold mb-4">Our Pricing Plans</h2>
//         <p className="text-lg text-gray-600">
//           Choose the package that&apos;s right for you.
//         </p>
//       </div>

//       {/* category based tabs */}
//       <Tabs defaultValue="account" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="account">Account</TabsTrigger>
//           <TabsTrigger value="password">Password</TabsTrigger>
//         </TabsList>
//         <TabsContent value="all">
//           {/* package card here based on category */}
//         </TabsContent>
//         <TabsContent value="account">
//           {/* package card here based on category */}
//         </TabsContent>
//         <TabsContent value="password">
//           {/* package card here based on category */}
//         </TabsContent>
//       </Tabs>

//       {/* Pricing Plans Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {
//           sortedPackages?.length > 0 ? (
//             sortedPackages.map((item) => (
//               <PricingPlansCard key={item?.id} singlePackage={item} />
//             ))
//           ) : (
//             <p className="col-span-3 text-center text-gray-500">
//               No packages available at the moment.
//             </p>
//           )
//         }
//       </div>
//     </div>
//   );
// };

// export default PricingPlansPage;





import { useGetAllPackagesQuery } from "@/features/packages/packagesApi";
import { useSelector } from "react-redux";
import Loading from "../components/atoms/Loading";
import PricingPlansCard from "../components/molecules/packages/PricingPlansCard";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGetCategoryQuery } from "@/features/categories/categoriesApi";

const PricingPlansPage = () => {
  const { data: allPackages, isLoading } = useGetAllPackagesQuery();
  const { data: allSections } = useGetCategoryQuery("sections");
  console.log("sections", allSections)

  const auth = useSelector((state) => state.auth);

  // Filter packages based on student section_id or show all packages if section_id is missing
  // const filteredPackages = allPackages?.data?.filter((pkg) =>
  //   !auth?.student?.section_id || pkg?.section_id === auth.student.section_id
  // );

  const sortedPackages = allPackages?.data?.length > 0
    ? allPackages?.data.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

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
        allSections?.data?.data?.length > 0 ? (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex justify-center gap-4">
              <TabsTrigger value="all">All</TabsTrigger>
              {allSections?.data?.data?.map((section) => (
                <TabsTrigger key={section.id} value={section.name}>
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All Packages Tab */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {
                  sortedPackages?.length > 0 ? (
                    sortedPackages.map((item) => (
                      <PricingPlansCard key={item?.id} singlePackage={item} />
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
            {allSections?.data?.data.map((section) => {
              const packagesForSection = sortedPackages.filter(
                (pkg) => pkg.section_id === section.id
              );

              return (
                <TabsContent key={section.id} value={section.name}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packagesForSection.length > 0 ? (
                      packagesForSection.map((item) => (
                        <PricingPlansCard key={item.id} singlePackage={item} />
                      ))
                    ) : (
                      <p className="col-span-3 text-center text-gray-500">
                        No packages available for {section.name}.
                      </p>
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        ) : (
          <p className="text-center text-gray-500">Loading categories...</p>
        )
      }
    </div>
  );
};

export default PricingPlansPage;