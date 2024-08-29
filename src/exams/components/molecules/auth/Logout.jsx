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
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "./../../../features/auth/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true)
    };

    const [logout, { isError, isSuccess, error }] = useLogoutMutation();

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            setOpen(false);
            toast.success("Logout Succes!");
            navigate("/login");
            console.log("heaa, logout hoiche")
        }
    }, [isSuccess, navigate, isError, error]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger onClick={handleOpen}>
                Logout
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out from your account? This will end your current session.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <form onSubmit={handleLogout} >
                            <Button type="submit">Yes</Button>
                        </form>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default Logout;