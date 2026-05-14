import React from 'react'

function Child({ name, age, roll, add }) {

    return (
        <div>
            <h1>Name: {name} </h1>
            <h1>age: {age} </h1>
            <h1>roll: {roll} </h1>
            <h1>add: {add} </h1>
        </div>
    )
}

export default Child;
