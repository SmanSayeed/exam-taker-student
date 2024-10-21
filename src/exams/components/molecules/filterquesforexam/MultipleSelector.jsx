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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

export function MultipleSelector({
    label,
    name,
    options,
    onChange,
    control,
    placeholder,
    defaultValue,
    rules
}) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState(defaultValue || []);

    const handleSetValue = (val) => {
        let updatedValues;

        if (selectedValues.includes(val)) {
            updatedValues = selectedValues.filter((item) => item !== val);
        } else {
            updatedValues = [...selectedValues, val];
        }

    setSelectedValues(updatedValues);

    if (onChange) {
      onChange(updatedValues); // Pass the updated array back to parent
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
                                    className="w-[480px] sm:w-[300px] md:w-[400px] h-auto justify-between"
                                >
                                    <div className="flex gap-2 justify-start flex-wrap">
                                        {
                                            selectedValues.length ?
                                                selectedValues.map((val) => (
                                                    <div key={val} className="px-2 py-1 rounded-xl border dark:text-gray-800 bg-slate-200 text-xs font-medium">
                                                        {options.find((item) => item.id === val)?.title || "Unknown"}
                                                    </div>
                                                ))
                                                : `Select ${label}...`
                                        }
                                    </div>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder={placeholder} />
                                    <CommandEmpty>No {label} found.</CommandEmpty>
                                    <CommandGroup>
                                        <CommandList>
                                            {
                                                options.map((item) => (
                                                    <CommandItem
                                                        key={item.id}
                                                        value={item.id}
                                                        onSelect={() => handleSetValue(item.id)}
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
