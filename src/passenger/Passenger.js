import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import { GENDERS } from "./constants";
import moment from "moment";
import StringInput from "../inputs/StringInput";
import SelectInput from "../inputs/SelectInput";
import DateInput from "../inputs/DateInput";
import Heading from "@kiwicom/orbit-components/lib/Heading";

class Passenger extends React.Component {

  validateName = (value) => {
    return /^[a-zA-Z]+$/.test(value);
  }

  validateDate = (date) => {
    return moment().diff(date,'years') >= 18;
  }

  render() {
    return (
      <Stack direction="column">
        <Heading>Passenger information</Heading>
        <StringInput label="First name" validator={this.validateName} requiredMsg="First name is required" errorMsg="First name can only contain valid characters [a-Z]"/>
        <StringInput label="Last name" validator={this.validateName} requiredMsg="Last name is required" errorMsg="First name can only contain valid characters [a-Z]"/>
        <StringInput label="Nationality" requiredMsg="Nationality is required"/>
        <SelectInput label="Gender" requiredMsg="Gender is required" options={GENDERS}/>
        <DateInput label="Date of birth" requiredMsg="Date is required" validator={this.validateDate} errorMsg="Passenger needs to be at least 18 years old"/>
      </Stack>
    );
  }
}

export default Passenger;
