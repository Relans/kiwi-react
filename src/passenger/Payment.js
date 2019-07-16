import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import moment from "moment";
import DateInput from "../inputs/DateInput";
import StringInput from "../inputs/StringInput";
import Heading from "@kiwicom/orbit-components/lib/Heading";

class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: {
        valid: false,
        value: '',
      },
      card: {
        valid: false,
        value: '',
      },
      date: {
        valid: false,
        value: '',
      },
      cvv: {
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

  validateCard = (value) => {
    return /^[0-9]{16}$/.test(value.replace(" ", ""));
  }

  valdateCVV = (value) => {
    return /^[0-9]{3,4}$/.test(value);
  }

  validateDate = (value) => {
    return value.diff(moment(), 'days') > 0;
  }

  render() {
    return (
      <Stack direction="column">
        <Heading>Payment information</Heading>
        <StringInput label="Cardholders Name" requiredMsg="Name is required" validator={this.validateName} errorMsg="Name can only contain valid characters [a-Z]"
          onChange={(state) => this.setState({ name: { ...this.state.name, ...state } })} />
        <StringInput label="Card number" requiredMsg="Card number is required" validator={this.validateCard} errorMsg="Card number is invalid"
          onChange={(state) => this.setState({ card: { ...this.state.card, ...state } })} />
        <DateInput label="Expiration date" requiredMsg="Expiration date is required" validator={this.validateDate} errorMsg="Expiration date needs to be after the current date"
          onChange={(state) => this.setState({ date: { ...this.state.date, ...state } })} />
        <StringInput label="CVV" requiredMsg="Email is required" validator={this.valdateCVV} errorMsg="Invalid CVV"
          onChange={(state) => this.setState({ cvv: { ...this.state.cvv, ...state } })} type="password"/>
      </Stack>
    );
  }
}

export default Payment;
