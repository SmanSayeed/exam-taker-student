import { useEffect, useState } from "react";
import MultiSelectCategory from './MultiSelectCategory';

export default function FilteringExamsForCategories() {
    const [selectedSections, setSelectedSections] = useState({});


    const sectionsTitle = ["Title-1", "Title-2", "Title-3", "Title-4", "Title-5",]

    const sections = sectionsTitle?.map((section) => section)
    

    const handleCategoryChange = (selectedCategories, label) => {
        setSelectedSections(prevSelectedSections => ({
            ...prevSelectedSections,
            [label]: selectedCategories
        }));
    };

    // Monitor state changes with useEffect
    useEffect(() => {
        // console.log("Selected sections updated:", selectedSections);
    }, [selectedSections]);


  return (
    <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-2/3 mx-auto ">
          <MultiSelectCategory
              options={sections}
              label="Questions Category"
              onChange={(selected) => handleCategoryChange(selected, "Category")}
          />
          <MultiSelectCategory
              options={sections}
              label="Sections"
              onChange={(selected) => handleCategoryChange(selected, "Sections")}
          />
          <MultiSelectCategory
              options={sections}
              label="Exam"
              onChange={(selected) => handleCategoryChange(selected, "Exam")}
          />
          <MultiSelectCategory
              options={sections}
              label="Subjects"
              onChange={(selected) => handleCategoryChange(selected, "Subjects")}
          />
          <MultiSelectCategory
              options={sections}
              label="Chapter"
              onChange={(selected) => handleCategoryChange(selected, "Chapter")}
          />
          <MultiSelectCategory
              options={sections}
              label="Topic"
              onChange={(selected) => handleCategoryChange(selected, "Topic")}
          />
    </div>
  )
}
