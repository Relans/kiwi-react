import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import StringInput from "../inputs/StringInput";
import Heading from "@kiwicom/orbit-components/lib/Heading";

class Contact extends React.Component {
  validateEmail = (value) => {
    return /^.+@.+\.\w+$/.test(value);
  }

  validatePhone = (value) => {
    return /^[0-9 ]+$/.test(value);
  }

  render() {
    return (
      <Stack direction="column">
        <Heading>Contact information</Heading>
        <StringInput label="Email adress" requiredMsg="Email is required" validator={this.validateEmail} errorMsg="Invalid email"/>
        <StringInput label="Phone" requiredMsg="Phone is required" validator={this.validateEmail} errorMsg="Invalid phone number"/>
      </Stack>
    );
  }
}

export default Contact;
