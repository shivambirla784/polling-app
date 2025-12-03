import React, { useState } from 'react';

const API_BASE = 'http://localhost:8001';

export default function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: no empty (trim) fields
    if (!question.trim() || !option1.trim() || !option2.trim() || !option3.trim() || !option4.trim()) {
      alert('Please fill in all the fields');
      return;
    }

    const body = {
      question: question.trim(),
      option1: option1.trim(),
      option2: option2.trim(),
      option3: option3.trim(),
      option4: option4.trim()
    };

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/polls/create`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Poll created successfully.');
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create poll.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Question
          <input placeholder="Enter Question" value={question} onChange={e => setQuestion(e.target.value)} />
        </label>

        <label>
          Option 1
          <input placeholder="Option 1" value={option1} onChange={e => setOption1(e.target.value)} />
        </label>

        <label>
          Option 2
          <input placeholder="Option 2" value={option2} onChange={e => setOption2(e.target.value)} />
        </label>

        <label>
          Option 3
          <input placeholder="Option 3" value={option3} onChange={e => setOption3(e.target.value)} />
        </label>

        <label>
          Option 4
          <input placeholder="Option 4" value={option4} onChange={e => setOption4(e.target.value)} />
        </label>

        <div className="actions">
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Poll'}</button>
        </div>
      </form>
    </div>
  );
}
