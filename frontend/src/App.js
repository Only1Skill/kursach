import React, { useState } from "react";
import { registerParticipant, getParticipants } from "./services/api";

function App() {
  const [event, setEvent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [participants, setParticipants] = useState([]);

  const register = async () => {
    if (!event || !firstName || !lastName) {
      alert("Please fill in all fields.");
      return;
    }
    await registerParticipant({ event, firstName, lastName });
    alert("Participant registered successfully!");
  };

  const fetchParticipants = async () => {
    const data = await getParticipants();
    if (Array.isArray(data)) {
      setParticipants(data);
    } else {
      setParticipants([]);
    }
  };

  return (
    <div>
      <h1>Register for a Sports Event</h1>
      <select onChange={(e) => setEvent(e.target.value)}>
        <option value="">Choose Event</option>
        <option value="Football">Football</option>
        <option value="Basketball">Basketball</option>
        <option value="Running">Running</option>
      </select>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={register}>Register</button>
      <button onClick={fetchParticipants}>Show Participants</button>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            {participant.firstName} {participant.lastName} - {participant.event}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
