import React, { useState } from 'react'

import Clock from '../clock'

const OPTION_LIST = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Yellow", value: "yellow" },
    { label: "White", value: "white" }
];

const ViewClock = () => {
    const [color, setColor] = useState('red');
    return (
        <div>
            <select
                name="select-color"
                id="select-color"
                onChange={(e) => setColor(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", borderRadius: "5px", width: "150px" }}
            >
                {OPTION_LIST.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
                {/* <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="white">White</option> */}
            </select>
            <Clock color={color} />
        </div>
    )
}

export default ViewClock;