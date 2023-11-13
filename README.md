# Motu Novu

Home Assignment

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Please, read the full documentation [here](https://github.com/petrovicluka/MotuNovu/blob/master/HomeAssignmentDocumentation.pdf) or download HomeAssignmentDocumentation.pdf file instead.

## Technologies Used

List the technologies and tools used to build the application, such as:

- Database: MySQL
- Backend: Node.js, Express
- Frontend: React
- Other tools: Axios, etc.

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js and npm
- MySQL
- ...


### Backend Setup

1. Navigate to the 'backend' directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
5. The backend server should now be running on http://localhost:3001.
   

### Frontend Setup

1. Navigate to the 'frontend' directory:
   ```bash
   cd user-managment-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

4. Start the frontend application:
   ```bash
   npm start
   ```
5. Open your browser and visit http://localhost:3000 to view the application.




### Database Setup

1. Open MySQL Workbench and create a new schema.

2. Import the database schema from the provided SQL file:
   ```bash
   mysql -u <username> -p <schema_name> < motunovu.sql

