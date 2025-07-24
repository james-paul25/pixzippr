import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6 mt-10 border-t dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm">
                    &copy; {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        PixZippr
                    </span>
                    . All rights reserved.
                </div>

                <div className="flex gap-6 text-sm">
                    <Link to="/about" className="hover:text-indigo-500 transition">
                        About
                    </Link>
                    <a
                        href="https://github.com/james-paul25/pixzippr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-500 transition"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
