import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import StringInput from "../inputs/StringInput";
import Heading from "@kiwicom/orbit-components/lib/Heading";

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: {
        valid: false,
        value: '',
      },
      phone: {
        valid: false,
        value: '',
      },
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      let valid = true;
      for (let key in this.state) {
        if (this.state.hasOwnProperty(key)) {
          if (!this.state[key].valid) {
            valid = false;
            break;
          }
        }
      }
      this.props.onChange({ ...this.state, valid });
    }
  }

  validateEmail = (value) => {
    return /^.+@.+\.\w+$/.test(value);
  }

  validatePhone = (value) => {
    return /^[0-9 ]+$/.test(value);
  }

  emailChanged = (inputstate) => {
    this.setState({ email: { ...this.state.email, ...inputstate } });
  }

  phoneChanged = (inputstate) => {
    this.setState({ phone: { ...this.state.phone, ...inputstate } });
  }

  render() {
    return (
      <Stack direction="column">
        <Heading>Contact information</Heading>
        <StringInput label="Email adress" onChange={this.emailChanged} validator={this.validateEmail}
          requiredMsg="Email is required" errorMsg="Invalid email" />
        <StringInput label="Phone" onChange={this.phoneChanged} validator={this.validatePhone}
          requiredMsg="Phone is required" errorMsg="Invalid phone number" />
      </Stack>
    );
  }
}

export default Contact;
