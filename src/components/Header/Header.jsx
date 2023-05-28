import { memo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { pages } from "./menuItems";
import { HiMenu, HiX } from "react-icons/hi";


const Header = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <header className="shadow w-full h-[68px] bg-white sticky top-0 w-full z-50 flex items-center">
            <div className="w-full md:container px-6">
                <div className="flex justify-between items-center ">
                    <div className="flex items-center">
                        <div>
                            <ul className={`hamburger-menu md:hidden ${toggle ? "block" : "hidden"}`}>
                                {
                                    pages.map((page, index) => <li onClick={() => setToggle(!toggle)} key={index}>
                                        <NavLink to={page.link} className="nav-link"> {page.name}</NavLink>
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
                        <ul className="flex hidden md:flex space-x-2">
                            {
                                pages.map((page, index) => <li key={index}>
                                    <NavLink to={page.link} className="nav-link hover:bg-[#1F2937] hover:text-white"> {page.name}</NavLink>
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
