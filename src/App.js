import React, { useState, useEffect } from 'react';
import GuestList from './components/GuestCard/GuestCard'; 
import './App.css';

function App() {
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    console.log(guests);
  }, [guests]);

  const addGuest = () => {
    if (guestName.trim()) {
      const newGuest = { id: Date.now(), name: guestName };
      setGuests([...guests, newGuest]);
      setGuestName('');
    }
  };

  const removeGuest = (id) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };

  return (
    <div className="app">
      <input
        type="text"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        placeholder="Enter guest name"
        className="app__input"
      />
      <button onClick={addGuest} className="app__add-btn">Add Guest</button>
          
      <GuestList guests={guests} removeGuest={removeGuest} />
    </div>
  );
}

export default App;