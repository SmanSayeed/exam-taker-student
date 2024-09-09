import * as React from "react"
import { Minus, Plus } from "lucide-react"

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
import CategoriesExam from "./CategoriesExam"



export function DrawerForQuestionFilter() {

    return (
        <div className="flex items-center justify-center ">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Choose your desired Questions</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto h-full w-full max-w-7xl flex items-center justify-center flex-col">
                        <DrawerHeader className="w-full md:w-3/4 mx-auto ">
                            <DrawerTitle>Set your desired destination</DrawerTitle>
                            <DrawerDescription> It's quick and easy</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">

                            <div className="mt-3 px-0  border4 ">
                                <CategoriesExam />
                            </div>
                        </div>
                        <DrawerFooter className="w-full md:w-3/5 mx-auto ">
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
       </div>
    )
}
