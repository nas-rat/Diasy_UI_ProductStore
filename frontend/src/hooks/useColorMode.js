import { useEffect, useState } from "react";

export function useColorMode() {


    const [color, setColor] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        if (color === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", color);
    }
        , [color])

    const toggleColorMode = () => {
        setColor((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return {
        color,
        toggleColorMode
    }

}