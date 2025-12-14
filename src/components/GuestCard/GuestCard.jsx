import React from 'react';
import './GuestCard.css';

function GuestCard({ id, name, removeGuest }) {
  return (
    <div className="guest-card">
      <span className="guest-card__name">{name}</span>
      <button 
        className="guest-card__delete-btn" 
        onClick={() => removeGuest(id)}
      >
        X
      </button>
    </div>
  );
}

function GuestList({ guests, removeGuest }) {
  return (
    <div className="guest-list">
      {guests.map(guest => (
        <GuestCard 
          key={guest.id} 
          id={guest.id} 
          name={guest.name} 
          removeGuest={removeGuest} 
        />
      ))}
    </div>
  );
}

export default GuestList;
