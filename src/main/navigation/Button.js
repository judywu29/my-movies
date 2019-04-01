import React from "react";
import "./Button.css"


const Button = ({onClick, children, disabled}) => (
    <div className='button'>
        <button disabled={disabled} onClick={onClick}>{children}</button>
    </div>
)

export default Button