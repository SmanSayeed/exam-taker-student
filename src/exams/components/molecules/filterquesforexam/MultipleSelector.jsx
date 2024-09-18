import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Controller } from "react-hook-form";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export function MultipleSelector({
    label,
    name,
    options,
    onChange,
    control,
    placeholder,
    defaultValue,
    rules,
    disabled
}) {

    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    console.log("selectedValues", selectedValues)

    // const handleSetValue = (val) => {
    //     if (selectedValues.includes(val)) {
    //         selectedValues.splice(selectedValues.indexOf(val), 1);
    //         setSelectedValues(selectedValues.filter((item) => item !== val));
    //         onChange(val);
    //     } else {
    //         setSelectedValues(prevValue => [...prevValue, val]);
    //     }
    // }

    const handleSetValue = (val) => {
        let updatedValues;
        if (selectedValues.includes(val)) {
            // Remove the value
            updatedValues = selectedValues.filter((item) => item !== val);
        } else {
            // Add the value
            updatedValues = [...selectedValues, val];
        }

        setSelectedValues(updatedValues);

        // Trigger the parent `onChange` to update state in the parent component
        if (onChange) {
            onChange(updatedValues);
        }
    };

    return (
        <div className="grid gap-2">
            <Label className="text-md font-bold">{label}</Label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field, formState: { errors } }) => (
                    <>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[480px] justify-between"
                                >
                                    <div className="flex gap-2 justify-start">
                                        {
                                            selectedValues?.length ?
                                                selectedValues.map((val, i) => (
                                                    <div key={i} className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">
                                                        {options.find((item) => item.id === val)?.title}
                                                    </div>
                                                ))
                                                : `Select ${label}...`
                                        }
                                    </div>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command
                                    value={field.value}
                                // onChange={(val) => {
                                //     field.onChange(val)
                                //     if (onChange) onChange(val)
                                // }}
                                >
                                    <CommandInput placeholder={placeholder} />
                                    <CommandEmpty>No {label} found.</CommandEmpty>
                                    <CommandGroup>
                                        <CommandList>
                                            {
                                                options.map((item) => (
                                                    <CommandItem
                                                        key={item.id}
                                                        value={item.id}
                                                        onSelect={() => {
                                                            handleSetValue(item.id)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedValues.includes(item.id) ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {item.title}
                                                    </CommandItem>
                                                ))
                                            }
                                        </CommandList>
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {errors[name] && <span className="text-red-600">{errors[name]?.message}</span>}
                    </>
                )}
            />
        </div>
    );
}

