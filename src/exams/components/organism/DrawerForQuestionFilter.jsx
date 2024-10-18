import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import QuesCategoryForFilter from "../molecules/filterquesforexam/QuesCategoryForFilter";

export function DrawerForQuestionFilter({ onFilterQuestions }) {
    const [isOpen, setIsOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const {
        control,
        handleSubmit,
        setValue
    } = useForm();

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

                            {/* select question type */}
                            <div className="p-4 pb-0 w-1/2 space-y-2">
                                <Label className="text-md font-bold">Question Type: </Label>
                                <Controller
                                    name="questionType"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                onValueChange={(val) => {
                                                    field.onChange(val)
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

                                            {/* <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start">
                                                        {field.value
                                                            ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
                                                            : "Select question type"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search question type..." />
                                                        <CommandList>
                                                            <CommandEmpty>No results found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {["normal", "mcq", "creative"].map((type) => (
                                                                    <CommandItem
                                                                        key={type}
                                                                        onSelect={() => {
                                                                            field.onChange(type);
                                                                            setPopoverOpen(false);
                                                                        }}
                                                                    >
                                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover> */}
                                        </>
                                    )}
                                />
                            </div>

                            <QuesCategoryForFilter
                                control={control}
                                setValue={setValue}
                            />

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