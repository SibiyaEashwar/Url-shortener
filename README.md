# URL Shortener with Analytics

A full-stack URL Shortener application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application allows users to register, log in, create short URLs, track clicks, view analytics, and manage their URLs.

##  YoutubeLink
# https://youtu.be/0xX1DFxiG5U

## Live at
# https://url-shortener-seven-lake.vercel.app/

## Features

* User Registration and Login using JWT Authentication
* Create Short URLs
* Redirect to Original URLs
* Track URL Clicks
* Analytics Dashboard
* View Recent Visits
* Copy Short URL to Clipboard
* Delete URLs
* Protected Routes
* MongoDB Atlas Integration

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* NanoID

### Database

* MongoDB Atlas
* Mongoose

## Project Structure

```text
url-shortener
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```
# ./architecture diagram.png


## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

### URL Management

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/url/shorten    | Create Short URL |
| GET    | /api/url/my-urls    | Get User URLs    |
| DELETE | /api/url/:id        | Delete URL       |
| GET    | /api/url/:shortCode | Redirect URL     |

### Analytics

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | /api/analytics/:urlId | Get URL Analytics |

## Screenshots

Add screenshots of:

* Login Page
* Register Page
* Dashboard
* Analytics Page

## Future Enhancements

* QR Code Generation
* Custom Short URLs
* User Profile Management
* Advanced Analytics Charts
* Export Analytics Reports

## Author

**Sibiya**

B.Tech Student

Project: URL Shortener with Analytics
# This project is a part of a hackathon run by https://katomaran.com
