const API_BASE_URL = 'http://backend:5000';

const boilerplate = {
  id: 1337,
  event: 'Fimoz',
  firstName: 'Victor',
  lastName: 'Tsoy'
}

export async function registerParticipant(participant) {
  try {
    const response = await fetch("http://localhost:5000/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to register participant: ${response.status}`);
    }
  } catch (error) {
    console.error("Error registering participant:", error);
  }
}

export async function getParticipants() {
  try {
    const response = await fetch("http://localhost:5000/participants");
    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to fetch participants: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching participants:", error);
    return [];
  }
}
