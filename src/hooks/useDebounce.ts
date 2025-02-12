import { useEffect, useState } from 'react';

/**
 * A hook that delays updating a value until after a specified delay time has passed
 * without any new changes to that value.
 * 
 * @param value - The value to debounce
 * @param delay - The delay time in milliseconds before the value should update
 * @returns The debounced value that updates only after the delay has passed
 * 
 * Example usage:
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * // debouncedSearch will only update 500ms after the user stops typing
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}