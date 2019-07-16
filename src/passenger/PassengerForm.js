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
      payment: { valid: false },
      current: 0
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

  addPassenger = () => {
    this.setState({ passengers: this.state.passengers.concat({ valid: false }) });
  }

  removePassanger = () => {
    this.setState({ passengers: this.state.passengers.slice(0, -1) });
  }

  continue = () => {
    this.setState({ current: 1 });
  }

  createPage = () => {
    if (this.state.current === 0) {
      return (
        <Stack direction="column">
          <Stack direction="column">
            {this.createPassengers()}
          </Stack>
          <Contact onChange={this.contactChanged} />
          <Stack direction="row">
            <Button onClick={this.addPassenger} disabled={this.state.passengers.length >= 9}>Add new passenger</Button>
            <Button onClick={this.removePassanger} disabled={this.state.passengers.length < 2}>Remove last passenger</Button>
            <Button onClick={this.continue}
              disabled={this.state.passengers.some(p => !p.valid) || !this.state.contact.valid}>Continue</Button>
          </Stack>
        </Stack>
      );
    } else {
      return (
        <Stack direction="column">
          <Payment onChange={this.paymentChanged} />
          <Button disabled={!this.state.payment.valid}>Submit</Button>
        </Stack>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header />
        {this.createPage()}
        <Illustration size="medium" name="Improve" />
      </Container>
    );
  }
}

export default PassengerForm;