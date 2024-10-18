import { useEffect, useState } from "react"

/**
 * Debounce a value
 * @param value - Value that should be debounced
 * @param delay - Time in miliseconds that indicates the delay
 * @returns Debounced value
 */
export const useDebounce = <T>(value: T, delay: number = 500) => {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debounceValue;
}