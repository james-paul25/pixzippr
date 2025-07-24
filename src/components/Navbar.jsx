import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDark, setIsDark] = useDarkMode();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
            : "text-gray-600 dark:text-gray-300 hover:text-indigo-500";

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50 transition-colors duration-300">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    PixZippr
                </Link>

                <div className="flex items-center gap-4">
                    {/* theme toggle */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition cursor-pointer"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        className="md:hidden text-gray-700 dark:text-gray-300"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className="hidden md:flex gap-6 text-sm sm:text-base">
                    <NavLink to="/" end className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={navLinkClass}>
                        About
                    </NavLink>
                </div>
            </nav>

            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 text-base bg-white dark:bg-gray-900 shadow transition-all duration-300">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `${navLinkClass({ isActive })} block`
                        }
                        onClick={toggleMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        end
                        className={({ isActive }) =>
                            `${navLinkClass({ isActive })} block`
                        }
                        onClick={toggleMenu}
                    >
                        About
                    </NavLink>
                </div>
            )}
        </header>
    );
};

export default Navbar;
