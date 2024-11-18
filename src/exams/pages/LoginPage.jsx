import { Link } from "react-router-dom";
import LoginForm from './../components/molecules/auth/LoginForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {

    return (
        <div className="px-2">
            <Card className="mx-auto max-w-sm w-full mt-20 md:mt-12 ">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Login
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <LoginForm />

                    {/* <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/registration" className="underline font-medium ">
                            Sign Up
                        </Link>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage;