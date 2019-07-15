import React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import moment from "moment";

class Payment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      card: '',
      expire: '',
      cvv: '',
      errors: {}
    };
    this.validators = {
      name: this.validateName,
      card: this.validateCard,
      expire: this.validateDate,
      cvv: this.valdateCVV
    }
  }

  validateName = (value) => {
    if (!value || !value.trim()) {
      return this.createError('Name is required');
    } else if (!/^[a-zA-Z]+$/.test(value)) {
      return this.createError('Name can only contain valid characters [a-Z]');
    }
    return null;
  }

  validateCard = (value) => {
    if (!value || !value.trim()) {
      return this.createError('Card number is required');
    } else if  (!/^[0-9]{16}$/.test(value.replace(" ",""))) {
      return this.createError('Card number is invalid');
    }
    return null;
  }

  valdateCVV = (value) => {
    if (!value || !value.trim()) {
      return this.createError('CVV is required');
    } else if  (!/^[0-9]{3,4}$/.test(value)) {
      return this.createError('CVV is invalid');
    }
    return null;
  }

  validateDate = (value) => {
    let result = null;
    const dateValues = value.split(".");
    const givenDate = moment(dateValues);
    if (givenDate.isValid()) {
      const dateDif = givenDate.diff(moment(), 'days');
      if (dateDif < 0) {
        result = this.createError("Expiration date needs to be after the current date");
      }
    } else {
      result = this.createError("Invalid date, valid format is yyyy.mm.dd");
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

  onCardChange = (event) => {
    const newValue = event.target.value ? event.target.value.trim() : '';
    if (newValue !== this.state[event.target.name]) {
      console.log(newValue);
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
        <InputField label="Cardholders Name" size="small" name="name" error={this.state.errors.name}
          value={this.state.name} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required />
        <InputField label="Card number" size="small" name="card" error={this.state.errors.card}
          value={this.state.card} onChange={this.onCardChange} onBlur={this.onBlur} onFocus={this.onFocus} required />
        <InputField label="Expiration date" size="small" name="expire" error={this.state.errors.expire}
          value={this.state.expire} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required />
        <InputField label="CVV" size="small" name="cvv" error={this.state.errors.cvv}
          value={this.state.cvv} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required />
      </Stack>
    );
  }
}



function mask(value){
  const str = value.toString().replace(" ","");
  let result = [];
  for(let i=0; i<str.length; i++){
    if(i % 4 === 0){
      result.push(" ");
    }
    result.push(str[i]);
  }

  return result.join("").trim();
}

export default Payment;
