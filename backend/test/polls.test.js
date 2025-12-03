const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Poll = require('../src/mongoose_models/polls');

const TEST_MONGO_URL = 'mongodb://127.0.0.1:27017/polling-app-test';

beforeAll(async () => {
  await mongoose.connect(TEST_MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Poll.deleteMany({});
});

describe('Polls API', () => {
  
  const samplePoll = {
    question: "Best Framework?",
    option1: "React",
    option2: "Vue",
    option3: "Angular",
    option4: "Svelte"
  };

  test('PUT /polls/create - Create a new poll successfully', async () => {
    const res = await request(app)
      .put('/polls/create')
      .send(samplePoll);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Poll created successfully.");

    const dbPoll = await Poll.findOne();
    expect(dbPoll).toBeTruthy();
    expect(dbPoll.question).toBe("Best Framework?");
  });

  test('PUT /polls/create - Fail if options not unique', async () => {
    const invalidPoll = { ...samplePoll, option2: "React" }; // Duplicate 'React'
    const res = await request(app).put('/polls/create').send(invalidPoll);
    
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("All options must be unique and inputs should not be empty");
  });

  test('GET /polls/fetch - Fetch existing poll', async () => {
    await new Poll(samplePoll).save();
    
    const res = await request(app).get('/polls/fetch');
    expect(res.statusCode).toBe(200);
    expect(res.body.question).toBe("Best Framework?");
    expect(res.body.option1).toBe("React");
  });

  test('GET /polls/fetch - Error if no poll', async () => {
    const res = await request(app).get('/polls/fetch');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Poll not found. Please create a poll");
  });

  test('PATCH /polls/updateVotes - Register vote and calculate percentage', async () => {
    await new Poll(samplePoll).save();

    const res = await request(app)
      .patch('/polls/updateVotes')
      .send({ selectedOption: 'option1' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Vote registered successfully.");

    const updatedPoll = await Poll.findOne();
    expect(updatedPoll.option1Votes).toBe(1);
    expect(updatedPoll.option1Percentage).toBe(100);
  });

});
