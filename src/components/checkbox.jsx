import React, { useState } from "react";

const Checkbox = ({ id, label, checked, ...props }) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    console.log(isChecked)
    return (
      <div className="checkbox-wrapper">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          {...props}
        />
        <label className="p-2" htmlFor={id}>{label}</label>
        <p className="px-6">{isChecked ? "(Selected)" : "(Unchecked)"}</p>
      </div>
    );
  }
  
  export default Checkbox;