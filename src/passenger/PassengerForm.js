import React from "react"
import Passenger from "./Passenger";
import styled from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Header from "./Header";
import Contact from "./Contact";

const Container = styled.div`
  max-width: 800px;
  width: 80%;
  margin: 0 auto;
`;

class PassengerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passengers: [{ isValid: false }],
      contactValid: false
    }
  }

  createPassengers = () => {
    let passengers = [];
    for (let i = 0; i < this.state.passengers.length; i++) {
      passengers.push(<Passenger key={i} validated={(errors) => this.passengerValidated(i, errors)} />)
    }
    return passengers;
  }

  canAddPassanger = () => {
    return this.state.passengers.length >= 9;
  }

  addPassenger = () => {
    this.setState({ passengers: this.state.passengers.concat({ isValid: false }) });
  }

  passengerValidated = (id, errors) => {
    let allValid = true;
    for (let key in errors) {
      if (errors.hasOwnProperty(key) && errors[key]) {
        allValid = false;
        break;
      }
    }
    let newPassangers = this.state.passengers.slice();
    newPassangers[id].isValid = allValid;
    this.setState({ passengers: newPassangers });
  }

  contactValidated = (errors) => {
    let allValid = true;
    for (let key in errors) {
      if (errors.hasOwnProperty(key) && errors[key]) {
        allValid = false;
        break;
      }
    }
    this.setState({contactValid: allValid});
  }
  
  render() {
    return (
      <Container>
        <Header />-
        <Stack direction="column">
          {this.createPassengers()}
        </Stack>
        <Contact validated={this.contactValidated}/>
        <button onClick={this.addPassenger} disabled={this.canAddPassanger()}>Add new passenger</button>
        <button disabled={this.state.passengers.some(p=>!p.isValid) || !this.state.contactValid}>Continue</button>
        <Illustration size="medium" name="Improve" />
      </Container>
    );
  }
}

export default PassengerForm;