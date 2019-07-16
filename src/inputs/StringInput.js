import React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";

class StringInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: null
    };
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  onBlur = (event) => {
    const value = event.target.value;
    let valid = true;
    if (!value || !value.trim()) {
      this.setState({ error: <div>{this.props.requiredMsg}</div> });
      valid = false;
    } else if (this.props.validator && !this.props.validator(value)) {
      this.setState({ error: <div>{this.props.errorMsg}</div> });
      valid = false;
    }
    this.props.onChange({ value, valid });
  }

  onFocus = () => {
    this.setState({ error: null });
  }

  render() {
    return (
      <InputField label={this.props.label} size="small" value={this.state.value} error={this.state.error}
        onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required />
    );
  }
}

export default StringInput;
