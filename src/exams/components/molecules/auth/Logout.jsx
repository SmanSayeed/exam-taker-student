import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoggedOutMutation } from "./../../../features/auth/authApi";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const Logout = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true)
    };

    const token = useSelector(state => state?.auth?.token)

    const [logout, { error }] = useLoggedOutMutation();

    const handleLogout = async () => {
        try {
            const { data: response } = await logout(token); 
            setOpen(false);
            toast.success(response?.message);
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error(error?.data?.message || "Something went wrong");
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen} >
            <AlertDialogTrigger onClick={handleOpen} className="w-full " >
                    <Button className="w-full mt-4">
                        Logout
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[95%] mx-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out from your account? This will end your current session.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default Logout;