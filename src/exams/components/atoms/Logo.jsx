import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="">
            <Link to="/" className="text-3xl font-semibold flex gap-2">
                <img src="/logo/icon.jpeg" alt="logo" className="h-8 w-20 rounded-xl" />
            </Link>
        </div>
    )
}

export default Logo;