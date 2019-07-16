import React from "react";
import Select from "@kiwicom/orbit-components/lib/Select";

class SelectInput extends React.Component {

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
    if (!value || !value.trim()) {
      this.setState({ error: <div>{this.props.requiredMsg}</div> });
    } else if (this.props.validator && !this.props.validator(value)) {
      this.setState({ error: <div>{this.props.errorMsg}</div> });
    }
  }

  onFocus = () => {
    this.setState({ error: null });
  }

  render() {
    return (
      <Select label={this.props.label} placeholder="Choose one" options={this.props.options} value={this.state.value}
        error={this.state.error} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} required
      />
    );
  }
}

export default SelectInput;
