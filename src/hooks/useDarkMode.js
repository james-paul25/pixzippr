import { useEffect, useState } from "react";

export default function useDarkMode() {
    const getInitialTheme = () => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme");
            if (stored) return stored === "dark";
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    };

    const [isDark, setIsDark] = useState(getInitialTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        console.log("Theme changed:", isDark ? "dark" : "light");

        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);
    
    const toggleTheme = () => setIsDark(prev => !prev);

    return [isDark, toggleTheme];
}
