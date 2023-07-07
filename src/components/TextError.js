import React from "react";

function TextError(props) {
    return (
        <div className="error">
            <i>{props.children}</i>
        </div>
    );
}

export default TextError;
