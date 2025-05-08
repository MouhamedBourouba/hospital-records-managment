# Records Management System

A robust backend API system for managing birth and death records with anonymous data handling, authentication, and real-time event notifications.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Event System](#event-system)
- [Database Models](#database-models)
- [Contributing](#contributing)

## Overview

This system provides a comprehensive solution for recording, managing, and monitoring birth and death records. It includes user authentication with role-based access, anonymous data handling for privacy compliance, and real-time event notifications for new records.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Server-Sent Events** - Real-time notifications
- **react** - Javascript framework to crate robust single page apps
**react-router-dom** - React router to navigate between pages
- **axios** - A promise-based HTTP Client for node.js and the browser
- **tailwindcss** - An open source CSS framework

## Project Structure

The project follows a modular architecture:

```
├── config/
│   └── db.js              # Database connection configuration
├── controllers/
│   ├── AnonymController.js  # Anonymous records management
│   ├── authController.js    # User authentication
│   ├── RecordController.js  # Records CRUD operations
│   └── UserController.js    # User management
├── middleware/
│   └── authMiddleware.js    # Authentication middleware
├── models/
│   ├── Anonym.js            # Anonymous data schema
│   ├── Record.js            # Record schema
│   └── User.js              # User schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── eventRoutes.js       # SSE event routes
│   ├── recordRoutes.js      # Record management routes
│   └── userRoutes.js        # User management routes
└── server.js                # Main application entry point
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

# API Documentation

## Authentication

The system uses JWT (JSON Web Token) for authentication. Tokens are issued upon successful login and have a 7-day expiration period.

**Protected Routes**: Many endpoints require authentication. Include the JWT token in the request headers:


---

## Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/auth/login` | Authenticate a user | `{ PhoneNumber, Password }` | JWT token and user data |
| POST | `/api/auth/register-employee` | Register a new employee | `{ PhoneNumber, Password, Organization, FullName, Role }` | JWT token and user data |
| POST | `/api/auth/register-researcher` | Register a new researcher (DSP only) | `{ PhoneNumber, Password, Organization, FullName, Role }` | JWT token and user data |
| GET | `/api/auth/employee` | Get authenticated employee data | - | Employee object |

---

## Hospital Endpoints

| Method | Endpoint | Description | Request Body/Params | Response |
|--------|----------|-------------|---------------------|----------|
| POST | `/api/death-record` | Create death record (hospital) | Death record data | Created record |
| POST | `/api/birth-record` | Create birth record (hospital) | Birth record data | Created record |
| GET | `/api/hospital/death-record` | Get all hospital death records | - | Array of records |
| GET | `/api/hospital/birth-record` | Get all hospital birth records | - | Array of records |

---

## ASP Endpoints

| Method | Endpoint | Description | Request Body/Params | Response |
|--------|----------|-------------|---------------------|----------|
| GET | `/api/asp/death-record` | Get all ASP death records | - | Array of records |
| GET | `/api/asp/birth-record` | Get all ASP birth records | - | Array of records |
| POST | `/api/asp/approve-birth-record/:recordId` | Approve a birth record | URL param `recordId` | Success message |
| POST | `/api/asp/reject-birth-record/:recordId` | Reject a birth record | URL param `recordId` | Success message |
| POST | `/api/asp/approve-death-record/:recordId` | Approve a death record | URL param `recordId` | Success message |
| POST | `/api/asp/reject-death-record/:recordId` | Reject a death record | URL param `recordId` | Success message |

---

## DSP Endpoints

| Method | Endpoint | Description | Request Body/Params | Response |
|--------|----------|-------------|---------------------|----------|
| GET | `/api/dsp/death-record` | Get all DSP death records | - | Array of records |
| GET | `/api/dsp/birth-record` | Get all DSP birth records | - | Array of records |

---

## Anonymized Data (Researchers)

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/death-anonym` | Get anonymized death records | Array of records |
| GET | `/api/birth-anonym` | Get anonymized birth records | Array of records |
| GET | `/api/death-anonym/cvs` | Download death anonymized data as CSV | CSV file |
| GET | `/api/birth-anonym/cvs` | Download birth anonymized data as CSV | CSV file |

---

## Statistics

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/statistics/birth-death` | Get birth and death statistics | Statistics object |

---

## PDF Generation

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/birth-record/:id/pdf` | Generate PDF for birth record | PDF file |
| GET | `/api/death-record/:id/pdf` | Generate PDF for death record | PDF file |

---

## Organization Management

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/organization` | Create a new organization | Organization data | Created organization |

---

## Event Streams

The application implements Server-Sent Events (SSE) for real-time updates:

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/eventsDeath` | Subscribe to death events | SSE stream |
| GET | `/api/eventsBirth` | Subscribe to birth events | SSE stream |

**Subscribing to Events (Client Example):**
```javascript
const deathEventSource = new EventSource('/api/eventsDeath');
deathEventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('New death record:', data);
};

const birthEventSource = new EventSource('/api/eventsBirth');
birthEventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('New birth record:', data);
};

## Event System

The application implements Server-Sent Events (SSE) for real-time updates:

- **Birth Events**: Notifies subscribers when new birth records are added
- **Death Events**: Notifies subscribers when new death records are added

**Subscribing to Events** (client-side example):
```javascript
const deathEventSource = new EventSource('/api/eventsDeath');
deathEventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('New death record:', data);
};

const birthEventSource = new EventSource('/api/eventsBirth');
birthEventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('New birth record:', data);
};
```

## Database Models

### User Model
- **PhoneNumber**: Unique phone number (required)
- **Password**: Hashed password (required)
- **Organization**: User's organization
- **FullName**: User's full name
- **Role**: User role (admin/standard user)

### Record Model
- **ArabicFullName**: Full name in Arabic (required)
- **LatinFullName**: Full name in Latin script (required)
- **BirthDate**: Date of birth (defaults to current date if not provided)
- **City**: City of birth or residence (required)
- **Wilaya**: Province/region name (required)
- **Gender**: Gender ("Male" or "Female") (required)
- **parents**:
  - **fatherName**: Father's name (optional)
  - **motherName**: Mother's name (optional)
- **SignedBy**: Name of the official who signed the record (required)
- **DateOfDeath**: Date of death (optional, defaults to null)
- **PlaceOfDeath**: Place where death occurred (optional)
- **CauseOfDeath**: Cause of death (optional)

### Anonym Model
Stores anonymized data with the following fields:
- **BirthDate**: Date of birth
- **City**: City of birth/residence
- **Wilaya**: Province/state
- **Gender**: Gender
- **SignedBy**: Official who signed the record
- **DateOfDeath**: Date of death (if applicable)
- **PlaceOfDeath**: Place of death (if applicable)
- **CauseOfDeath**: Cause of death (if applicable)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
