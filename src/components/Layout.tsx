import { Outlet } from "react-router";
import Sidebar from "./shared/Sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <main className={"drawer lg:drawer-open"}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={sidebarOpen} />
            <section className="drawer-content lg:px-5">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <div className="bg-[#f6f7ff] w-full min-h-[calc(100vh-67px)] rounded-lg">
                    <Outlet />
                </div>
            </section>
            <section className="drawer-side z-[60]">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={() => setSidebarOpen(false)
                }></label>
                <Sidebar setSidebarOpen={setSidebarOpen} />
            </section>
        </main>
    );
}

export default Layout;