import React, { useEffect, useState } from 'react'

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    })
    return debouncedValue;
}



// import { useState, useEffect } from "react";

// export function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => clearTimeout(timer);
//     }, [value, delay]);

//     return debouncedValue;
// }
