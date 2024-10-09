// import { Button } from "@/components/ui/button"
// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Label } from "@/components/ui/label"
// import { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty } from "@/components/ui/command"
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
// import { useState } from "react"
// import { Controller, useForm } from "react-hook-form"

// export function DrawerForQuestionFilter({ onFilterQuestions }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [popoverOpen, setPopoverOpen] = useState(false);

//     const { control, handleSubmit } = useForm();

//     const onSubmit = (formData) => {
//         onFilterQuestions(formData);
//         setIsOpen(false);
//     };

//     return (
//         <div className="flex items-center justify-center">
//             <Drawer open={isOpen} onOpenChange={setIsOpen}>
//                 <DrawerTrigger asChild>
//                     <Button variant="outline" className="tracking-wide">Filter Your Questions</Button>
//                 </DrawerTrigger>
//                 <DrawerContent>

//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mx-auto h-full w-full flex items-center justify-center flex-col">
//                             <DrawerHeader className="text-center mt-10">
//                                 <DrawerTitle>Set your desired destination</DrawerTitle>
//                                 <DrawerDescription>It's quick and easy</DrawerDescription>
//                             </DrawerHeader>

//                             {/* Choose type with popover and search */}
//                             <div className="p-4 pb-0 w-1/2 space-y-2">
//                                 <Label className="text-md font-bold">Question Type: </Label>
//                                 <Controller
//                                     name="questionType"
//                                     control={control}
//                                     render={({ field }) => (
//                                         <>
//                                             <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
//                                                 <PopoverTrigger asChild>
//                                                     <Button variant="outline" className="w-full justify-start">
//                                                         {field.value
//                                                             ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
//                                                             : "Select question type"}
//                                                     </Button>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent className="w-full p-0">
//                                                     <Command>
//                                                         <CommandInput placeholder="Search question type..." />
//                                                         <CommandList>
//                                                             <CommandEmpty>No results found.</CommandEmpty>
//                                                             <CommandGroup>
//                                                                 {["normal", "mcq", "creative"].map((type) => (
//                                                                     <CommandItem
//                                                                         key={type}
//                                                                         onSelect={() => {
//                                                                             field.onChange(type);
//                                                                             setPopoverOpen(false);
//                                                                         }}
//                                                                     >
//                                                                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                                                                     </CommandItem>
//                                                                 ))}
//                                                             </CommandGroup>
//                                                         </CommandList>
//                                                     </Command>
//                                                 </PopoverContent>
//                                             </Popover>
//                                         </>
//                                     )}
//                                 />
//                             </div>

//                             <DrawerFooter className="w-full md:w-3/5 mx-auto">
//                                 <Button type="submit">Submit</Button>
//                                 <DrawerClose asChild>
//                                     <Button variant="outline">Cancel</Button>
//                                 </DrawerClose>
//                             </DrawerFooter>
//                         </div>
//                     </form>

//                 </DrawerContent>
//             </Drawer>
//         </div>
//     );
// }










// import { Button } from "@/components/ui/button"
// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"
// import { Controller, useForm } from "react-hook-form"
// import { MultipleSelector } from "../molecules/filterquesforexam/MultipleSelector"

// export function DrawerForQuestionFilter({ onFilterQuestions }) {
//     const [isOpen, setIsOpen] = useState(false);

//     const {
//         control,
//         setValue,
//         handleSubmit
//     } = useForm();

//     // const { data: questionsData } = useGetQuestionsQuery();

//     const onSubmit = (formData) => {

//         onFilterQuestions(formData);
//         setIsOpen(false);

//         // try {
//         //     const filteredQues = questionsData?.data?.data.filter(que => que?.type === formData?.questionType);

//         //     onFilterQuestions(filteredQues);
//         //     setIsOpen(false);
//         // } catch (err) {
//         //     console.error(err);
//         // }
//     };

//     return (
//         <div className="flex items-center justify-center ">
//             <Drawer open={isOpen} onOpenChange={setIsOpen}>
//                 <DrawerTrigger asChild>
//                     <Button variant="outline" className="tracking-wide" >Filter Your Questions</Button>
//                 </DrawerTrigger>
//                 <DrawerContent>

//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mx-auto h-full w-full flex items-center justify-center flex-col">
//                             <DrawerHeader className="text-center mt-10">
//                                 <DrawerTitle>Set your desired destination</DrawerTitle>
//                                 <DrawerDescription> It&apos;s quick and easy</DrawerDescription>
//                             </DrawerHeader>

//                             {/* choose type */}
//                             <div className="p-4 pb-0 w-1/2 space-y-2">
//                                 <Label className="text-md font-bold">Question Type: </Label>
//                                 <Controller
//                                     name="questionType"
//                                     control={control}
//                                     render={({ field }) => (
//                                         <>
//                                             <Select Select
//                                                 onValueChange={(value) => {
//                                                     field.onChange(value);
//                                                 }}
//                                                 value={field.value}
//                                             >
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Type" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     <SelectItem value="normal">Normal</SelectItem>
//                                                     <SelectItem value="mcq">MCQ</SelectItem>
//                                                     <SelectItem value="creative">Creative</SelectItem>
//                                                 </SelectContent>
//                                             </Select>
//                                         </>
//                                     )}
//                                 />
//                             </div>

//                             <div>
//                                 <MultipleSelector  />
//                             </div>

//                             {/* select category */}
//                             {/* <div className="p-4 pb-0">
//                                 <div className="mt-3 px-0  border4 ">
//                                     <QuesCategoryForFilter
//                                         control={control}
//                                         setValue={setValue}
//                                     />
//                                 </div>
//                             </div> */}

//                             <DrawerFooter className="w-full md:w-3/5 mx-auto ">
//                                 <Button type="submit">Submit</Button>
//                                 <DrawerClose asChild>
//                                     <Button variant="outline">Cancel</Button>
//                                 </DrawerClose>
//                             </DrawerFooter>
//                         </div>
//                     </form>

//                 </DrawerContent>
//             </Drawer>
//         </div>
//     )
// }






import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { MultipleSelector } from "../molecules/filterquesforexam/MultipleSelector"
import { useStartExamMutation } from "@/exams/features/exams/examsApi"

export function DrawerForQuestionFilter({ onFilterQuestions }) {
    const [isOpen, setIsOpen] = useState(false);

    const [startExam, { isLoading: isExamStarting }] = useStartExamMutation();
    console.log("startExam", isExamStarting)


    const {
        control,
        setValue,
        handleSubmit
    } = useForm();

    const questionOptions = [
        { id: "1", title: "Math" },
        { id: "2", title: "Science" },
        { id: "3", title: "History" },
    ];

    const onSubmit = (formData) => {
        onFilterQuestions(formData);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-center">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="tracking-wide">Filter Your Questions</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-auto h-full w-full flex items-center justify-center flex-col">
                            <DrawerHeader className="text-center mt-10">
                                <DrawerTitle>Set your desired destination</DrawerTitle>
                                <DrawerDescription>It&apos;s quick and easy</DrawerDescription>
                            </DrawerHeader>

                            {/* Question Type */}
                            <div className="p-4 pb-0 w-1/2 space-y-2">
                                <Label className="text-md font-bold">Question Type: </Label>
                                <Controller
                                    name="questionType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="mcq">MCQ</SelectItem>
                                                <SelectItem value="creative">Creative</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* MultipleSelector for filtering by categories */}
                            <div className="p-4 w-1/2">
                                <MultipleSelector
                                    label="Question Categories"
                                    name="categories"
                                    options={questionOptions}
                                    control={control}
                                    onChange={(selectedValues) => setValue('categories', selectedValues)}
                                    placeholder="Select categories"
                                />
                            </div>

                            <DrawerFooter className="w-full md:w-3/5 mx-auto">
                                <Button type="submit">Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </form>
                </DrawerContent>
            </Drawer>
        </div>
    );
}