import React from "react";

const Input = props => {
  const {
    type,
    value,
    id,
    name,
    errors,
    onChange,
    placeholder,
    classes
  } = props;
  return (
    <div>
      <div>
        <input
          className={classes}
          type={type}
          value={value}
          id={id}
          name={name}
          onChange={ev => onChange && onChange(ev)}
          placeholder={placeholder}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default Input;
