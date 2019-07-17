import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import { GENDERS } from "./constants";
import moment from "moment";
import StringInput from "../inputs/StringInput";
import SelectInput from "../inputs/SelectInput";
import DateInput from "../inputs/DateInput";
import Heading from "@kiwicom/orbit-components/lib/Heading";

class Passenger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        valid: false,
        value: '',
      },
      lastName: {
        valid: false,
        value: '',
      },
      nationality: {
        valid: false,
        value: '',
      },
      gender: {
        valid: false,
        value: ''
      },
      date: {
        valid: false,
        value: ''
      }
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
      this.props.onChange(this.props.index, { ...this.state, valid });
    }
  }

  validateName = (value) => {
    return /^[a-zA-Z]+$/.test(value);
  }

  validateDate = (date) => {
    return moment().diff(date, 'years') >= 18;
  }

  firstNameChanged = (inputState) => {
    this.setState({ firstName: { ...this.state.firstName, ...inputState } });
  }

  lastNameChanged = (inputState) => {
    this.setState({ lastName: { ...this.state.lastName, ...inputState } });
  }

  nationalityChanged = (inputState) => {
    this.setState({ nationality: { ...this.state.firstName, ...inputState } });
  }

  genderChanged = (inputState) => {
    this.setState({ gender: { ...this.state.firstName, ...inputState } });
  }

  dateChanged = (inputState) => {
    this.setState({ date: { ...this.state.date, ...inputState } });
  }

  render() {
    return (
      <Stack direction="column">
        <Heading>Passenger information</Heading>
        <StringInput label="First name" validator={this.validateName} onChange={this.firstNameChanged}
          requiredMsg="First name is required" errorMsg="First name can only contain valid characters [a-Z]" />
        <StringInput label="Last name" validator={this.validateName} onChange={this.lastNameChanged}
          requiredMsg="Last name is required" errorMsg="First name can only contain valid characters [a-Z]" />
        <StringInput label="Nationality" onChange={this.nationalityChanged}
          requiredMsg="Nationality is required" />
        <SelectInput label="Gender" options={GENDERS} onChange={this.genderChanged}
          requiredMsg="Gender is required" />
        <DateInput label="Date of birth" validator={this.validateDate} onChange={this.dateChanged}
          requiredMsg="Date is required" errorMsg="Passenger needs to be at least 18 years old" />
      </Stack>
    );
  }
}

export default Passenger;
