import { Link } from 'react-router-dom';
import RegisterForm from './../components/molecules/auth/RegisterForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
    return (
        <div className="px-2">
            <Card className="mx-auto max-w-lg xl:max-w-xl w-full mt-20 md:mt-12 ">
                <CardHeader>
                    <CardTitle className="text-2xl underline underline-offset-2 ">
                        Registration
                    </CardTitle>
                    <CardDescription>
                        Fill out the form below to be a part of OES
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RegisterForm />

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/" className="underline font-medium ">
                            Log In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage;