import { useRef } from "react";

export default function useDebounce(callback, delay = 300) {
    const timeoutRef = useRef(null);

    const debouncedFunction = (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedFunction;
}
