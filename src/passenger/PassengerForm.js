import React from "react"
import Passenger from "./Passenger";
import styled from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Button from "@kiwicom/orbit-components/lib/Button";
import Header from "./Header";
import Contact from "./Contact";
import Payment from "./Payment";

const Container = styled.div`
  max-width: 800px;
  width: 80%;
  margin: 0 auto;
`;

class PassengerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passengers: [{ valid: false }],
      contact: { valid: false },
      payment: { valid: false }
    }
  }

  createPassengers = () => {
    let passengers = [];
    for (let i = 0; i < this.state.passengers.length; i++) {
      passengers.push(<Passenger key={i} onChange={(state) => this.passengerChanged(i, state)} />);
    }
    return passengers;
  }

  passengerChanged = (index, state) => {
    let newPassangers = this.state.passengers.slice();
    newPassangers[index] = state;
    this.setState({ passengers: newPassangers });
  }

  contactChanged = (state) => {
    this.setState({ contact: state });
  }

  paymentChanged = (state) => {
    this.setState({ payment: state });
  }

  canAddPassanger = () => {
    return this.state.passengers.length >= 9;
  }

  addPassenger = () => {
    this.setState({ passengers: this.state.passengers.concat({ valid: false }) });
  }

  render() {
    return (
      <Container>
        <Header />-
        <Stack direction="column">
          <Stack direction="column">
            {this.createPassengers()}
          </Stack>
          <Contact onChange={this.contactChanged}/>
          <Stack direction="row">
            <Button onClick={this.addPassenger} disabled={this.canAddPassanger()}>Add new passenger</Button>
            <Button disabled={this.state.passengers.some(p => !p.valid) || !this.state.contact.valid}>Continue</Button>
          </Stack>
        </Stack>
        <Illustration size="medium" name="Improve" />
        <Payment onChange={this.paymentChanged}/>
      </Container>
    );
  }
}

export default PassengerForm;