import React from "react"
import Passenger from "./Passenger";
import styled from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Button from "@kiwicom/orbit-components/lib/Button";
import Header from "./Header";
import Contact from "./Contact";
import Payment from "./Payment";
import { MAX_PASSANGER } from "./constants";

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
      currentStep: 0
    }
  }

  rendersPassengers = () => {
    return this.state.passengers.map((_, i) =>
      <Passenger key={i} onChange={this.passengerChanged} index={i} />)
  }

  passengerChanged = (index, passengerState) => {
    this.setState((state) => {
      let newPassengers = state.passengers.slice();
      newPassengers[index] = passengerState;
      return {
        passengers: newPassengers
      }
    });
  }

  contactChanged = (contactState) => {
    this.setState({ contact: contactState });
  }

  paymentChanged = (paymentState) => {
    this.setState({ payment: paymentState });
  }

  addPassenger = () => {
    this.setState((state) => {
      return {
        passengers: state.passengers.concat({ valid: false })
      }
    });
  }

  removePassanger = () => {
    this.setState((state) => {
      return {
        passengers: state.passengers.slice(0, -1)
      }
    });
  }

  continue = () => {
    this.setState({ currentStep: 1 });
  }

  createPage = () => {
    if (this.state.currentStep === 0) {
      return (
        <Stack direction="column">
          <Stack direction="column">
            {this.rendersPassengers()}
          </Stack>
          <Contact onChange={this.contactChanged} />
          <Stack direction="row">
            <Button onClick={this.addPassenger} disabled={this.state.passengers.length >= MAX_PASSANGER}>Add new passenger</Button>
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