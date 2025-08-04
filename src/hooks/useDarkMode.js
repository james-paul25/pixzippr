import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("theme");
        return stored ? stored === "dark" : true; 
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleDarkMode = () => setIsDark(!isDark);

    return [isDark, toggleDarkMode];
}
