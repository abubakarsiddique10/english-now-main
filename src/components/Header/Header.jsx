import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { pages } from "./menuItems";
import { HiMenu, HiX } from "react-icons/hi";


const Header = () => {
    const [toggle, setToggle] = useState(false);

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

