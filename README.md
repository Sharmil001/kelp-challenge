## 🚀 Overview

This project is a high-performance CSV to JSON converter API built using **Express.js** and **PostgreSQL**. 
It reads CSV files from a configurable location, parses each record into structured JSON format, and inserts it into the database.

## 🚀 Quick Start

### 📦 Installation
1. **Clone the Repository**

```bash
https://github.com/Sharmil001/kelp-challenge.git
cd kelp-challenge
```

2. **Install Dependencies
```bash
pnpm install
# or
npm install
```

3. **Configure Environment Variables
```bash
CSV_FILE_PATH=./src/data/users.csv
DATABASE_URL=`your postgress db rul`
PORT=3000
```

4. Run App
```bash
pnpm start
# or
npm start
```

##  📸 Screenshots
<img width="1677" height="1024" alt="Screenshot 2025-07-13 at 12 34 39 PM" src="https://github.com/user-attachments/assets/035c7bd7-f2dd-4341-89f1-8b220a18eae6" />

1. Start Local Server
```bash
npm start
#or
npm run start
```

2. Test Endpoint
```bash
# Test API Endpoint using terminal
curl -X POST http://localhost:3000/api/upload
#or
#Alternatively, you can test this endpoint using a browser extension like Postman or any REST client.
```

## 📁 Project Structure
```bash
kelp-challenge/
│
├── src/
│   ├── config/           # Environment variable configuration and setup
│   ├── controllers/      # Route handler functions (e.g., for CSV parsing and uploads)
│   ├── data/             # Directory containing the CSV file to be processed
│   ├── db/               # PostgreSQL connection and DB setup logic
│   ├── routers/          # Express route definitions
│   ├── services/         # Business logic layer (e.g., DB insertions, data transformations)
│   ├── utils/            # Custom CSV parsing logic and helper functions
│   └── app.ts            # Main application entry point (Express app initialization)
│
├── .env                  # Environment variables (CSV file path, DB config)
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation and setup instructions
```
