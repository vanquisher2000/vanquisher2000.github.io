import React, { useState } from 'react';


export const Dropdown = ({
  options,
  id,
  onSelectedValueChange,
  selectedValue
}) => (
  <select
    name="catagory"
    id={id}
    onChange={(event) =>
      onSelectedValueChange(event.target.value)
    }
  >
    {options.map(({ value, label }) => (
      <option value={value} label={label} selected={value===selectedValue}></option>
    ))}
  </select>
);