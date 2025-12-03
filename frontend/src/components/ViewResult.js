import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8001';

function ProgressBar({ percent }) {
  const safePercent = isNaN(percent) ? 0 : Math.max(0, Math.min(100, percent));
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${safePercent}%` }} data-testid="progress-bar" />
    </div>
  );
}

export default function ViewResult() {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (loading && !poll) return <div className="card">Loading results...</div>;
  if (!poll) return <div className="card">No poll found. Please create a poll first.</div>;

  return (
    <div className="card">
      <h2>View Result</h2>
      <h3 className="question">{poll.question}</h3>

      <div className="option">
        <div className="option-row">
          <div className="option-label">{poll.option1}</div>
          <div className="option-stats">{poll.option1Votes} votes — {poll.option1Percentage}%</div>
        </div>
        <ProgressBar percent={parseFloat(poll.option1Percentage)} />
      </div>

      <div className="option">
        <div className="option-row">
          <div className="option-label">{poll.option2}</div>
          <div className="option-stats">{poll.option2Votes} votes — {poll.option2Percentage}%</div>
        </div>
        <ProgressBar percent={parseFloat(poll.option2Percentage)} />
      </div>

      <div className="option">
        <div className="option-row">
          <div className="option-label">{poll.option3}</div>
          <div className="option-stats">{poll.option3Votes} votes — {poll.option3Percentage}%</div>
        </div>
        <ProgressBar percent={parseFloat(poll.option3Percentage)} />
      </div>

      <div className="option">
        <div className="option-row">
          <div className="option-label">{poll.option4}</div>
          <div className="option-stats">{poll.option4Votes} votes — {poll.option4Percentage}%</div>
        </div>
        <ProgressBar percent={parseFloat(poll.option4Percentage)} />
      </div>
    </div>
  );
}
