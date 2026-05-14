import { useMemo, useState } from "react";

export default function SearchComponent() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const increaseByOne = () => {
        setCount(count + 1);
    }

    const increaseByFive = () => {
        setCount2(count2 + 5);
    }

    const calculate = useMemo(() => {
        console.log("Inside the calculate function ---- ");
        return (
            <h2>{count2 * 2}</h2>
        )
    }, [count2]);

    return (
        <>
            <h1>Count: {count}</h1>
            <button onClick={increaseByOne}>Increase By One</button>
            <h1>Something here...</h1>
            <button onClick={increaseByFive}>Increase By Five</button>
            {calculate}
        </>
    );
};
