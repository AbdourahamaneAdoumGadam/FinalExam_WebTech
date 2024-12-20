import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BookTrip = () => {
  const [formData, setFormData] = useState({
    destination: "",
    travelDate: "",
    returnDate: "",
    passengers: 1,
    additionalServices: [],
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      additionalServices: checked
        ? [...prevData.additionalServices, value]
        : prevData.additionalServices.filter((service) => service !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    navigate("/booking-confirmation");
  };

  return (
    <BookTripContainer>
      <FormWrapper>
        <h2>Book Your Trip</h2>
        <form onSubmit={handleSubmit}>
          <InputField>
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
            />
          </InputField>

          <InputField>
            <label htmlFor="travelDate">Travel Date</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleInputChange}
              required
            />
          </InputField>

          <InputField>
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              required
            />
          </InputField>

          <InputField>
            <label htmlFor="passengers">Number of Passengers</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              min="1"
              required
            />
          </InputField>

          <ServiceSection>
            <p>Select Additional Services</p>
            <label>
              <input
                type="checkbox"
                value="Meal"
                onChange={handleCheckboxChange}
              />
              Meal
            </label>
            <label>
              <input
                type="checkbox"
                value="Insurance"
                onChange={handleCheckboxChange}
              />
              Travel Insurance
            </label>
            <label>
              <input
                type="checkbox"
                value="Guide"
                onChange={handleCheckboxChange}
              />
              Tour Guide
            </label>
          </ServiceSection>

          <SubmitButton type="submit">Book Trip</SubmitButton>
        </form>
      </FormWrapper>
    </BookTripContainer>
  );
};

// Styled-components for CSS-in-JS

const BookTripContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://img.freepik.com/free-photo/sunny-beach-with-palm-trees_74190-7480.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;

  /* Adding a dark overlay */
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
    z-index: 1;
  }

  /* Ensuring the content appears above the overlay */
  > * {
    position: relative;
    z-index: 2;
  }
`;

const FormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
`;

const InputField = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const ServiceSection = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
  }
  input {
    margin-right: 10px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;

export default BookTrip;
