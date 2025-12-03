import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8001';

export default function RegisterVote() {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    fetchPoll();
  }, []);

  const fetchPoll = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/polls/fetch`);
      const data = await res.json();
      if (res.ok) {
        setPoll(data);
      } else {
        alert(data.error || 'Failed to fetch poll');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to fetch poll');
    } finally {
      setLoading(false);
    }
  };

  const registerVote = async (optionKey) => {
    if (!poll) return;
    setVoting(true);
    try {
      const res = await fetch(`${API_BASE}/polls/updateVotes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedOption: optionKey })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Vote registered successfully.');
        await fetchPoll();
      } else {
        alert(data.error || 'Failed to register vote');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to register vote');
    } finally {
      setVoting(false);
    }
  };

  if (loading && !poll) return <div className="card">Loading poll...</div>;

  if (!poll) return <div className="card">No poll found. Please create a poll first.</div>;

  return (
    <div className="card">
      <h2>Register Vote</h2>
      <h3 className="question">{poll.question}</h3>

      <div className="options">
        <button className="option-btn" onClick={() => registerVote('option1')} disabled={voting}>{poll.option1}</button>
        <button className="option-btn" onClick={() => registerVote('option2')} disabled={voting}>{poll.option2}</button>
        <button className="option-btn" onClick={() => registerVote('option3')} disabled={voting}>{poll.option3}</button>
        <button className="option-btn" onClick={() => registerVote('option4')} disabled={voting}>{poll.option4}</button>
      </div>
    </div>
  );
}
