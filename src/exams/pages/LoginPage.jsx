import NoticeBanner from "@/components/notice-banner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LoginForm from './../components/molecules/auth/LoginForm';

const LoginPage = () => {

    return (
        <>
            <NoticeBanner
                label="নিজের ইচ্ছামতো অধ্যায়,টপিক,সময় সিলেক্ট করে প্রাক্টিস পরিক্ষা দেওয়ার প্রিমিয়াম ফিচারটি শুধু মাত্র পেইড ব্যাচের স্টুডেন্টদের জন্য ফ্রি। অনুগ্রহ করে পেজে মেসেজ দিন"
                variant="warning"
                className="flex flex-col md:flex-row items-center flex-wrap text-center"
            />
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
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default LoginPage;