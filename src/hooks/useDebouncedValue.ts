import { useEffect, useState } from "react";

export function useDebouncedValue<Value>(value: Value, delayMs: number): Value {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => clearTimeout(timeoutId);
    }, [value, delayMs]);

    return debouncedValue;
}
