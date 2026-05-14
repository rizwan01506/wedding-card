import React, { useEffect, useState } from 'react';

const Clock = ({ color }) => {
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], { hour12: true })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setTime(
                date.toLocaleTimeString([], { hour12: true })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                backgroundColor: '#000',
                color: color,
                padding: '10px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '20px',
                textAlign: 'center',
                width: 'fit-content',
            }}
        >
            {time}
        </div>
    );
};

export default Clock;
