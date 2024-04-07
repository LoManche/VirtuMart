/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

export function Email({ id, name, value, onChange, props }) {
  return (
    <TextField
      id={id}
      name={name}
      type="email"
      label="Email"
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
}

export function Password({ id, name, value, onChange, props }) {
  return (
    <TextField
      id={id}
      name={name}
      type={"password"}
      label={"Password"}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
