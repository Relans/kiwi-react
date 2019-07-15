import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import InputGroup from "@kiwicom/orbit-components/lib/InputGroup";
import Select from "@kiwicom/orbit-components/lib/Select";
import { GENDERS, MONTHS } from "./constants";
import moment from "moment";

class Passenger extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      nationality: '',
      gender: '',
      day: '',
      month: '',
      year: '',
      errors: {}
    };
    this.validators = {
      firstName: (value) => this.validateName(value, 'First'),
      lastName: (value) => this.validateName(value, 'Last'),
      nationality: (value) => this.valideteRequiredField(value, 'Nationality'),
      gender: (value) => this.valideteRequiredField(value, 'Gender'),
      day: (value) => this.valideteDay(value),
      month: (value) => this.valideteMonth(value),
      year: (value) => this.valideteYear(value),
    }
  }

  validateName = (value, type) => {
    if (!value) {
      return this.createError(type + ' name is required');
    } else if (!/^[a-zA-Z]+$/.test(value)) {
      return this.createError(type + ' name can only contain valid characters [a-Z]');
    }
    return null;
  }

  valideteRequiredField = (value, fieldName) => {
    if (!value || !value.trim()) {
      return this.createError(fieldName + ' is required');
    }
    return null;
  }

  valideteDay = (value) => {
    return this.valideteRequiredField(value, 'Day') ||
      this.validateDate({ year: this.state.year, month: this.state.month, day: value });
  }

  valideteMonth = (value) => {
    return this.valideteRequiredField(value, 'Month') ||
      this.validateDate({ year: this.state.year, month: value, day: this.state.day });
  }

  valideteYear = (value) => {
    return this.valideteRequiredField(value, 'Year') ||
      this.validateDate({ year: value, month: this.state.month, day: this.state.day });
  }

  validateDate = (dateValues) => {
    let result = null;
    const givenDate = moment([dateValues.year,dateValues.month,dateValues.day]);
    if (givenDate.isValid()) {
      const dateDif = moment().diff(givenDate,'years');
      if (dateDif < 18) {
        result = this.createError("Passenger needs to be at least 18 years old");
      }
    } else {
      result = this.createError("Invalid date");
    }
    return result;
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

  onDateBlur = (event) => {
    const name = event.target.name;
    let errors = { ...this.state.errors };
    errors.date = this.validators[name](event.target.value);
    this.setState({ errors });
    this.props.validated(errors);
  }

  onFocus = (event) => {
    const name = event.target.name;
    let errors = { ...this.state.errors };
    errors[name] = null;
    this.setState({ errors });
  }

  onDateFocus = (event) => {
    let errors = { ...this.state.errors };
    errors.date = null;
    this.setState({ errors });
  }

  createError = (message) => {
    return <div>{message}</div>;
  }

  render() {
    return (
      <Stack direction="column">
        <InputField label="First name" size="small" name="firstName" error={this.state.errors.firstName}
          value={this.state.firstName} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required />
        <InputField label="Last name" size="small" name="lastName"
          value={this.state.lastName} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required error={this.state.errors.lastName} />
        <InputField label="Nationality" size="small" name="nationality"
          value={this.state.nationality} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required error={this.state.errors.nationality} />
        <Select
          label="Gender" name="gender" placeholder="Choose one"
          options={GENDERS} value={this.state.gender} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required error={this.state.errors.gender}
        />
        <InputGroup
          label="Date of birth"
          flex={["0 0 60px", "1 1 100%", "0 0 90px"]}
          onChange={this.onChange} onBlur={this.onDateBlur} onFocus={this.onDateFocus} error={this.state.errors.date}>
          <InputField placeholder="DD" name="day" type="number"
            value={this.state.day} required />
          <Select
            name="month" placeholder="Month"
            options={MONTHS} value={this.state.month} required />
          <InputField placeholder="YYYY" name="year"
            value={this.state.year} required type="number" />
        </InputGroup>
      </Stack>
    );
  }
}

export default Passenger;
