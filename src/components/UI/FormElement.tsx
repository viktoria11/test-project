import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type FormElementProps = TextFieldProps & {
  propertyName?: string;
};

const FormElement = (props: FormElementProps) => {
  const myStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
  };

  let inputChildren = undefined;

  let inputComponent = (
    <TextField
      fullWidth
      variant="outlined"
      label={props.title}
      error={!!props.error}
      type={props.type}
      select={props.type === 'select'}
      name={props.propertyName}
      id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      helperText={props.error}
      style={myStyle}
    >
      {inputChildren}
    </TextField>
  );

  return inputComponent;
};

export default FormElement;
