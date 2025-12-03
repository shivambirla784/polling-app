const express = require('express');
const router = express.Router();
const Poll = require('../mongoose_models/polls');

// Validation helper
function validateInputs(body) {
  const fields = ['question', 'option1', 'option2', 'option3', 'option4'];
  for (const f of fields) {
    if (!body[f] || !body[f].trim()) {
      return { ok: false, message: "All options must be unique and inputs should not be empty" };
    }
  }
  // Unique check
  const opts = [body.option1, body.option2, body.option3, body.option4].map(s => s.trim().toLowerCase());
  if (new Set(opts).size !== 4) {
    return { ok: false, message: "All options must be unique and inputs should not be empty" };
  }
  return { ok: true };
}

// PUT /polls/create
router.put('/create', async (req, res) => {
  try {
    const { question, option1, option2, option3, option4 } = req.body;

    const validation = validateInputs({ question, option1, option2, option3, option4 });
    if (!validation.ok) {
      return res.status(400).json({ error: validation.message });
    }

    await Poll.deleteMany({});

    const poll = new Poll({
      question: question.trim(),
      option1: option1.trim(),
      option2: option2.trim(),
      option3: option3.trim(),
      option4: option4.trim()
    });

    await poll.save();
    res.status(201).json({ message: "Poll created successfully." });

  } catch (err) {
    res.status(400).json({ error: "Something went wrong while creating poll." });
  }
});

// GET /polls/fetch
router.get('/fetch', async (req, res) => {
  try {
    const poll = await Poll.findOne({});
    if (!poll) return res.status(400).json({ error: "Poll not found. Please create a poll" });

    res.status(200).json(poll.toObject());
  } catch (err) {
    res.status(400).json({ error: "Something went wrong while fetching poll." });
  }
});

// PATCH /polls/updateVotes
router.patch('/updateVotes', async (req, res) => {
  try {
    const { selectedOption } = req.body;

    if (!selectedOption || !['option1','option2','option3','option4'].includes(selectedOption)) {
      return res.status(400).json({ error: "Invalid selected option." });
    }

    const poll = await Poll.findOne({});
    if (!poll) return res.status(400).json({ error: "Poll not found. Please create a poll" });

    poll[selectedOption + "Votes"]++;

    const v1 = poll.option1Votes;
    const v2 = poll.option2Votes;
    const v3 = poll.option3Votes;
    const v4 = poll.option4Votes;

    const total = v1 + v2 + v3 + v4;

    function pct(v) {
      return total === 0 ? 0 : Math.round((v / total) * 100 * 100) / 100;
    }

    poll.option1Percentage = pct(v1);
    poll.option2Percentage = pct(v2);
    poll.option3Percentage = pct(v3);
    poll.option4Percentage = pct(v4);

    await poll.save();
    res.status(200).json({ message: "Vote registered successfully." });

  } catch (err) {
    res.status(400).json({ error: "Something went wrong while registering vote." });
  }
});

module.exports = router;
