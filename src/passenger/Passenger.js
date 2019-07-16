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
      for(let key in this.state){
        if(this.state.hasOwnProperty(key)){
          if(!this.state[key].valid){
            valid = false;
            break;
          }
        }
      }
      this.props.onChange({...this.state, valid});
    }
  }

  validateName = (value) => {
    return /^[a-zA-Z]+$/.test(value);
  }

  validateDate = (date) => {
    return moment().diff(date, 'years') >= 18;
  }

  render() {
    return (
      <Stack direction="column">
        <Heading>Passenger information</Heading>
        <StringInput label="First name" validator={this.validateName} requiredMsg="First name is required" errorMsg="First name can only contain valid characters [a-Z]"
          onChange={(state) => this.setState({ firstName: { ...this.state.firstName, ...state } })} />
        <StringInput label="Last name" validator={this.validateName} requiredMsg="Last name is required" errorMsg="First name can only contain valid characters [a-Z]"
          onChange={(state) => this.setState({ lastName: { ...this.state.lastName, ...state } })} />
        <StringInput label="Nationality" requiredMsg="Nationality is required"
          onChange={(state) => this.setState({ nationality: { ...this.state.nationality, ...state } })} />
        <SelectInput label="Gender" requiredMsg="Gender is required" options={GENDERS}
          onChange={(state) => this.setState({ gender: { ...this.state.gender, ...state } })} />
        <DateInput label="Date of birth" requiredMsg="Date is required" validator={this.validateDate} errorMsg="Passenger needs to be at least 18 years old"
          onChange={(state) => this.setState({ date: { ...this.state.date, ...state } })} />
      </Stack>
    );
  }
}

export default Passenger;
