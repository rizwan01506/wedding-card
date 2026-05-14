import React, { useEffect, useState } from 'react'

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setTime(date.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                backgroundColor: "red",
                color: "green",
                padding: "10px",
                borderRadius: "8px"
            }}>
            {time}
        </div>
    )
}

export default Clock;
