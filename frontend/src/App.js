import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreatePoll from './components/CreatePoll';
import RegisterVote from './components/RegisterVote';
import ViewResult from './components/ViewResult';

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Polling App</h1>
        <nav>
          <Link to="/" className="nav-link">Create Poll</Link>
          <Link to="/register-vote" className="nav-link">Register Vote</Link>
          <Link to="/view-result" className="nav-link">View Result</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          <Route path="/register-vote" element={<RegisterVote />} />
          <Route path="/view-result" element={<ViewResult />} />
        </Routes>
      </main>

      <footer className="footer">&copy; Polling App</footer>
    </div>
  );
}
