import React from "react";
import styled from "styled-components"; // Importing styled-components

const BookingConfirmation = () => {
  return (
    <ConfirmationContainer>
      <h2>Booking Confirmed!</h2>
      <p>Your trip has been successfully booked. You will receive a confirmation email shortly.</p>
    </ConfirmationContainer>
  );
};

const ConfirmationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;
  h2 {
    font-size: 24px;
    color: #4caf50;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    color: #333;
  }
`;

export default BookingConfirmation;
