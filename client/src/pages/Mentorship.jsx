import React, { useEffect, useState } from 'react';

const Mentorship = () => {
  const [connections, setConnections] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.role;
  const id = user._id;

  const fetchConnections = async () => {
    try {
      if (role === 'mentor') {
        const mentees = user.mentees || [];
        const responses = await Promise.all(
          mentees.map((mentee) =>
            fetch(`https://mentormatch-ewws.onrender.com/mentee/${mentee}`).then((res) => res.json())
          )
        );
        setConnections(responses);
      } else if (role === 'mentee') {
        const mentors = user.mentors || [];
        const responses = await Promise.all(
          mentors.map((mentor) =>
            fetch(`https://mentormatch-ewws.onrender.com/mentor/${mentor}`).then((res) => res.json())
          )
        );
        setConnections(responses);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      {role === 'mentor' ? (
        <>
          <h1>My Mentees</h1>
          {connections.map((connection) => (
            <div key={connection._id}>
              <h2>{connection.name}</h2>
              <h3>{connection.skills}</h3>
              <img src={connection.photo} alt="mentee" />
              <p>{connection.email}</p>
              <p>{connection.mobile}</p>
              <p>{connection.bio}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <h1>My Mentors</h1>
          {connections.map((connection) => (
            <div key={connection._id}>
              <h2>{connection.name}</h2>
              <h3>{connection.skills}</h3>
              <img src={connection.photo} alt="mentor" />
              <p>{connection.email}</p>
              <p>{connection.mobile}</p>
              <p>{connection.bio}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Mentorship;
