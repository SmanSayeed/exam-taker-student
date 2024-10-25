import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="">
            <Link to="/" className="text-3xl font-semibold flex gap-2">
            <img src="/logo/icon.jpeg" alt="logo" className="h-10 w-10" />
                OES
            </Link>
        </div>
    )
}

export default Logo;