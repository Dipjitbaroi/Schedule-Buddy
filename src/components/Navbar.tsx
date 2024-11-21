import { AiOutlineUser } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { INavbarProps } from "../utils/interface";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = ({ setSidebarOpen }: INavbarProps) => {
    const { signOut, user } = useContext(AuthContext)
    const handleLogoutClick = () => {
        if (signOut) {

            signOut()
        }
    }
    return (
        <nav className="navbar bg-base-100 sticky top-0 z-50">
            <section className="flex-1">
                <label htmlFor="my-drawer" className="drawer-button btn btn-square btn-ghost hover:bg-[#EFF3FF] mr-2 lg:hidden" onClick={() => setSidebarOpen((prev) => !prev)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
                <h1 className="text-[22px] font-semibold text-black">All Users</h1>
            </section>
            <section className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.profilePicture} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className=" hover:bg-primary hover:text-white">
                                <AiOutlineUser />
                                Profile
                            </a>
                        </li>
                        <li >

                            <a onClick={handleLogoutClick} className=" hover:bg-primary hover:text-white"><BiLogOutCircle />Logout</a>
                        </li>
                    </ul>
                </div>
            </section>
        </nav>);
}

export default Navbar;