import React from 'react';
import logo from './logo.svg';
import HomePage from "./components/HomePage";
import './App.css';
import CheckoutForm from './components/CheckoutForm';
import EditProfile from './components/EditProfile';
import LoginForm from './components/LoginForm';
import MovieDetails from './components/MovieDetails';
import MovieList from "./components/MovieList";
import { sampleMovies } from "./data/movies";
import OrderConfirmation from './components/OrderConfrimation';
import RegistrationForm from './components/RegistrationForm';
import RegistrationConfirmation from './components/RegistrationConfirmation';
import TicketSelection from "./components/TicketSelection";

function App() {
  const handleConfirm = (tickets: number) => {
    alert(`You selected ${tickets} tickets.`);
  };

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;