import React, { useState, useEffect } from 'react';
import './app.css';
import ReactImage from './react.png';
import firebase from './Firebase';

export default function App() {
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => setUsername(user.username));
    firebase
      .database()
      .ref('status')
      .on('value', (snapshot) => {
        setStatus(snapshot.val());
      });
  });

  return (
    <div>
      {username ? (
        <h1>{`Hello ${username}`}</h1>
      ) : (
        <h1>Loading.. please wait!</h1>
      )}
      {status ? (
        <p>
          {' '}
          {`You are ${status}`}
          {' '}
        </p>
      ) : (
        <p>Loading... please wait!</p>
      )}
      <img src={ReactImage} alt="react" />
    </div>
  );
}
