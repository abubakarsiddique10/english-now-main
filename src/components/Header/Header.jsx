import { memo, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { AppContext } from "../../App";
import baseURL from "../../api/api";
import { pages, profilPages } from "./menuItems";
import { MdLogout } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";


const Header = () => {
    const { user, setUser } = useContext(AppContext)
    const [toggle, setToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        setUser(null)
        navigate('/');
        window.location.reload();
    }

    return (
        <header className="shadow py-4 bg-white sticky top-0 w-full z-50">
            <div className="md:container px-3">
                <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-2">
                        <div>


                            <ul className={`hamburger-menu md:hidden ${toggle ? "block" : "hidden"}`}>
                                {
                                    pages.map((page, index) => <li onClick={() => setToggle(!toggle)} key={index}>
                                        <Link to={page.link} className="nav-link"> <page.icon className="nav-icon" /> {page.name}</Link>
                                    </li>)
                                }
                            </ul>
                        </div>
                        <Link to="/" className="logo z-50">English Now</Link>
                    </div>


                    <div>
                        <button onClick={() => setToggle(!toggle)} className="hamburger">
                            {toggle ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                        </button>
                        <ul className="flex hidden md:flex">
                            {
                                pages.map((page, index) => <li key={index}>
                                    <Link to={page.link} className="nav-link"> {page.name}</Link>
                                </li>)
                            }
                        </ul>
                    </div>

                </div>
            </div>
        </header >
    )
}
export default memo(Header);

