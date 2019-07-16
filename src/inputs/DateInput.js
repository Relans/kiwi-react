import React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import InputGroup from "@kiwicom/orbit-components/lib/InputGroup";
import Select from "@kiwicom/orbit-components/lib/Select";
import { MONTHS } from "../passenger/constants";
import moment from "moment";

class DateInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: null,
      day: '',
      month: '',
      year: '',
      error: null
    };
  }

  onChange = (event) => {
    this.setState(this.getDateFromEvent(event));
  }

  getDateFromEvent = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case 'day': return {
        date: moment([this.state.year, this.state.month, value]),
        day: value
      }
      case 'month': return {
        date: moment([this.state.year, value, this.state.day]),
        month: value
      }
      case 'year': return {
        date: moment([value, this.state.month, this.state.day]),
        year: value
      }
      default:
        return {};
    }
  }

  onBlur = (event) => {
    const date = this.getDateFromEvent(event).date;
    let valid = true;
    if (!date) {
      this.setState({ error: <div>{this.props.requiredMsg}</div> });
      valid = false;
    } else if (!date.isValid()) {
      this.setState({ error: <div>Invalid date</div> });
      valid = false;
    } else if (!this.props.validator(date)) {
      this.setState({ error: <div>{this.props.errorMsg}</div> });
      valid = false;
    }
    this.props.onChange({ value: date, valid });
  }

  onFocus = () => {
    this.setState({ error: null });
  }

  render() {
    return (
      <InputGroup
        label={this.props.label}
        flex={["0 0 60px", "1 1 100%", "0 0 90px"]}
        onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} error={this.state.error}>
        <InputField placeholder="DD" name="day" type="number" value={this.state.day} required />
        <Select placeholder="Month" name="month" options={MONTHS} value={this.state.month} required />
        <InputField placeholder="YYYY" name="year" type="number" value={this.state.year} required />
      </InputGroup>
    );
  }
}

export default DateInput;
