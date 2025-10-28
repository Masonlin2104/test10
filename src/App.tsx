import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from './components/LoginForm';
import CheckoutForm from './components/CheckoutForm';
import EditProfile from './components/EditProfile';
import MovieDetails from './components/MovieDetails';
import MovieList from "./components/MovieList";
import { sampleMovies } from "./data/movies";
import OrderConfirmation from './components/OrderConfrimation';
import RegistrationForm from './components/RegistrationForm';
import RegistrationConfirmation from './components/RegistrationConfirmation';
import TicketSelection from "./components/TicketSelection";
import AdminManageMovies from "./components/AdminManageMovies";
import AdminHomePage from './components/AdminHomePage';
import CreateAccount from './components/CreateAccount';
import User from './components/User';
import AdminPromotion from './components/AdminPromotions';
import './App.css';

// Import the new EmailVerification component
import EmailVerification from './components/EmailVerification';

function App() {
  const handleConfirm = (tickets: number) => {
    alert(`You selected ${tickets} tickets.`);
  };

  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="/Checkout" element={<CheckoutForm />} /> 
      <Route path="/User" element={<User />} />
      <Route path="/RegistrationForm" element={<RegistrationForm />} />
      <Route path="/verify" element={<EmailVerification />} />
      <Route 
            path="/RegistrationConfirmation" 
            element={<RegistrationConfirmation name='Mason'/>} />

      {/* Movie selection and details */}
      <Route path="/MovieList" element={<MovieList movies={sampleMovies} />} />
      <Route path="/MovieDetails" element={<MovieDetails />} />

      {/* Admin pages */}
      <Route path="/AdminManageMovies" element={<AdminManageMovies />} />
      <Route path="/AdminHomePage" element={<AdminHomePage />} />
      <Route path="/AdminPromotions" element={<AdminPromotion />} />

      {/* Ticket selection */}
      <Route
        path="/TicketSelection"
        element={<TicketSelection movieTitle="Spider-Man: No Way Home" onConfirm={handleConfirm} />}
      />

      {/* Order summary */}
      <Route
        path="/OrderConfirmation"
        element={
          <OrderConfirmation
            orderNumber="ABC123"
            movieTitle="Spider-Man: No Way Home"
            tickets={[
              { id: 1, seat: "A1", price: 12.5 },
              { id: 2, seat: "A2", price: 12.5 }
            ]}
          />
        }
      />
    </Routes>
  );
}

export default App;