import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming we are using Axios for API calls

const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState({ status: "all", destination: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the trip history from API
  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await axios.get("/api/trips");
        setTrips(response.data); // Assuming the response data is an array of trips
        setLoading(false);
      } catch (err) {
        setError("Failed to load trips. Please try again later.");
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  // Filter trips based on status and destination
  const filteredTrips = trips.filter((trip) => {
    const statusFilter =
      filter.status === "all" || trip.status === filter.status;
    const destinationFilter =
      filter.destination === "" || trip.destination.toLowerCase().includes(filter.destination.toLowerCase());
    return statusFilter && destinationFilter;
  });

  // Handle cancellation of a trip
  const handleCancel = async (tripId) => {
    try {
      await axios.post(`/api/trips/cancel/${tripId}`);
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === tripId ? { ...trip, status: "cancelled" } : trip
        )
      );
      alert("Trip has been cancelled.");
    } catch (err) {
      alert("Failed to cancel trip. Please try again.");
    }
  };

  if (loading) return <p>Loading trips...</p>;

  return (
    <TripHistoryContainer>
      <ContentWrapper>
        <Title>Trip History</Title>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by destination"
            value={filter.destination}
            onChange={(e) => setFilter({ ...filter, destination: e.target.value })}
          />
          <StatusFilter
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </StatusFilter>
        </SearchBar>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {filteredTrips.length === 0 ? (
          <NoTripsMessage>No trips found matching your criteria.</NoTripsMessage>
        ) : (
          <TripList>
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id}>
                <TripDetails>
                  <h3>{trip.tripName}</h3>
                  <p><strong>Destination:</strong> {trip.destination}</p>
                  <p><strong>Booking Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {trip.status}</p>
                </TripDetails>
                <Actions>
                  <ActionButton onClick={() => navigate(`/trip-details/${trip.id}`)}>
                    View Details
                  </ActionButton>
                  {trip.status === "pending" && (
                    <CancelButton onClick={() => handleCancel(trip.id)}>
                      Cancel Trip
                    </CancelButton>
                  )}
                </Actions>
              </TripCard>
            ))}
          </TripList>
        )}
      </ContentWrapper>
    </TripHistoryContainer>
  );
};

// Styled-components for styling

const TripHistoryContainer = styled.div`
  background-color: #f4f4f4;
  padding: 50px 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  max-width: 1000px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 45%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
  }
`;

const StatusFilter = styled.select`
  width: 45%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
  margin-top: 10px;
`;

const NoTripsMessage = styled.p`
  font-size: 18px;
  color: #888;
`;

const TripList = styled.div`
  margin-top: 20px;
`;

const TripCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TripDetails = styled.div`
  text-align: left;
  h3 {
    font-size: 22px;
    color: #333;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    color: #555;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e53935;
  }
`;

export default TripHistory;
