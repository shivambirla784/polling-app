# 🗳️ Polling App (React + Node.js + MongoDB)

A full-stack polling application that allows users to:

- Create a new poll  
- Vote on existing polls  
- View results with vote counts and percentage-based bar charts  
- Includes complete test coverage with Jest + React Testing Library  
- Backend tested with Supertest & Jest  

---

## 🚀 Tech Stack

### **Frontend**
- React.js  
- React Router  
- Fetch API  
- Jest + React Testing Library  

### **Backend**
- Node.js  
- Express  
- MongoDB (Mongoose)  
- Jest + Supertest  

### **Other**
- Shell scripts for install/run/test  
- Fully containerizable (optional Docker support can be added)

---

## 📁 Project Structure

```
polling-app/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── mongoose_models/
│   │   │   └── polls.js
│   │   └── routers/
│   │       └── polls.js
│   ├── test/
│   │   └── polls.test.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── styles.css
    │   └── components/
    │       ├── CreatePoll.js
    │       ├── RegisterVote.js
    │       └── ViewResult.js
    ├── setupTests.js
    └── package.json
```

---

## 🧪 Running Tests

### Backend Tests
```
cd backend
npm test
```

### Frontend Tests
```
cd frontend
CI=true npm test
```

---

## 📦 Installation

Use the provided script:

```
./install.sh
```

Or manually:

```
cd backend
npm install

cd ../frontend
npm install
```

---

## ▶️ Running the Application

Start backend + frontend together:

```
./run.sh
```

Or manually:

### Start Backend
```
cd backend
npm start
```

### Start Frontend
```
cd frontend
npm start
```

---

## 🔧 Environment Configuration

The backend uses:

```
mongodb://127.0.0.1:27017/polling-app
```

You can override it using:

```
export MONGO_URL=<custom-url>
```

---

## 🗄️ API Endpoints

### **Create Poll**
```
PUT /polls/create
```

### **Fetch Poll**
```
GET /polls/fetch
```

### **Update Votes**
```
PATCH /polls/updateVotes
```

---

## 🧰 Scripts Provided

### install.sh  
Installs backend + frontend dependencies.

### run.sh  
Runs backend & frontend concurrently.

### test.sh  
Runs all backend and frontend tests.

---

## 💡 Future Improvements (Optional)
- Add charts.js visualization
- Add Redux or Zustand for state management
- Add Docker support
- Add user authentication
- Store multiple polls instead of single-poll system

---

## 👨‍💻 Author

Built with ❤️ by **Your Name**  
Feel free to fork, contribute, or raise issues!

