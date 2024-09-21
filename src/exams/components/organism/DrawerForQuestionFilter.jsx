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

export function DrawerForQuestionFilter({ onFilterQuestions }) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        control,
        setValue,
        handleSubmit
    } = useForm();

    // const { data: questionsData } = useGetQuestionsQuery();

    const onSubmit = (formData) => {

        onFilterQuestions(formData);
        setIsOpen(false);

        // try {
        //     const filteredQues = questionsData?.data?.data.filter(que => que?.type === formData?.questionType);

        //     onFilterQuestions(filteredQues);
        //     setIsOpen(false);
        // } catch (err) {
        //     console.error(err);
        // }
    };

    return (
        <div className="flex items-center justify-center ">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="tracking-wide" >Filter Your Questions</Button>
                    <Button variant="outline" className="tracking-wide" >Filter Your Questions</Button>
                </DrawerTrigger>
                <DrawerContent>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-auto h-full w-full flex items-center justify-center flex-col">
                            <DrawerHeader className="text-center mt-10">
                                <DrawerTitle>Set your desired destination</DrawerTitle>
                                <DrawerDescription> It&apos;s quick and easy</DrawerDescription>
                            </DrawerHeader>

                            {/* choose type */}
                            <div className="p-4 pb-0 w-1/2 space-y-2">
                                <Label className="text-md font-bold">Question Type: </Label>
                                <Controller
                                    name="questionType"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Select Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="mcq">MCQ</SelectItem>
                                                    <SelectItem value="creative">Creative</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </>
                                    )}
                                />
                            </div>

                            {/* select category */}
                            {/* <div className="p-4 pb-0">
                                <div className="mt-3 px-0  border4 ">
                                    <QuesCategoryForFilter
                                        control={control}
                                        setValue={setValue}
                                    />
                                </div>
                            </div> */}

                            <DrawerFooter className="w-full md:w-3/5 mx-auto ">
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
    )
}