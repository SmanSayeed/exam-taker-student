import { Link } from "react-router-dom";

const Logo = () => {
    const homePageUrl = import.meta.env.VITE_HOME_PAGE_URL;

    return (
        <div className="">
            <Link to={homePageUrl} className="text-3xl font-semibold flex gap-2">
                <img src="/logo/icon.jpeg" alt="logo" className="h-8 w-20 rounded-xl" />
            </Link>
        </div>
    );
};

export default Logo;