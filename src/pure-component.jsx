import React from "react";

const PureComponent = ({ onClick }) => {
    console.log("Child Component Rendered");
    return <button onClick={onClick}>Child Button</button>;
}

export default React.memo(PureComponent);
