import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import moment from "moment";
import DateInput from "../inputs/DateInput";
import StringInput from "../inputs/StringInput";
import Heading from "@kiwicom/orbit-components/lib/Heading";

class Payment extends React.Component {

  validateName = (value) => {
    return /^[a-zA-Z]+$/.test(value);
  }

  validateCard = (value) => {
    return /^[0-9]{16}$/.test(value.replace(" ",""));
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
        <StringInput label="Cardholders Name" requiredMsg="Name is required" validator={this.validateName} errorMsg="Name can only contain valid characters [a-Z]"/>
        <StringInput label="Card number" requiredMsg="Card number is required" validator={this.validateCard} errorMsg="Card number is invalid"/>
        <DateInput label="Expiration date" requiredMsg="Expiration date is required" validator={this.validateDate} errorMsg="Expiration date needs to be after the current date"/>
        <StringInput label="CVV" requiredMsg="Email is required" validator={this.valdateCVV} errorMsg="Invalid CVV"/>
      </Stack>
    );
  }
}

export default Payment;
