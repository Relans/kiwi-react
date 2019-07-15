import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import InputField from "@kiwicom/orbit-components/lib/InputField";

class Contact extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      phone: '',
      errors: {}
    };
    this.validators = {
      email: this.validateEmail,
      phone: this.validatePhone,
    }
  }

  validateEmail = (value) => {
    if (!value || !value.trim()) {
      return this.createError('Email is required');
    } else if (!/^.+@.+\.\w+$/.test(value)) {
      return this.createError('Invalid email adress');
    }
    return null;
  }

  validatePhone = (value, fieldName) => {
    if (!value || !value.trim()) {
      return this.createError(fieldName + ' is required');
    } else if (!/^[0-9 ]+$/.test(value)) {
      return this.createError('Invalid phone number');
    }
    return null;
  }

  onChange = (event) => {
    const newValue = event.target.value ? event.target.value.trim() : '';
    if (newValue !== this.state[event.target.name]) {
      const newState = {
        [event.target.name]: newValue
      }
      this.setState(newState);
    }
  }

  onBlur = (event) => {
    const name = event.target.name;
    let errors = { ...this.state.errors };
    errors[name] = this.validators[name](event.target.value);
    this.setState({ errors });
    this.props.validated(errors);
  }

  onFocus = (event) => {
    const name = event.target.name;
    let errors = { ...this.state.errors };
    errors[name] = null;
    this.setState({ errors });
  }

  createError = (message) => {
    return <div>{message}</div>;
  }

  render() {
    return (
      <Stack direction="column">
        <InputField label="Email adress" size="small" name="email" error={this.state.errors.email}
          value={this.state.firstName} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required />
        <InputField label="Phone" size="small" name="phone"
          value={this.state.lastName} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required error={this.state.errors.phone} />
      </Stack>
    );
  }
}

export default Contact;
