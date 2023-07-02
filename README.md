# Energy Monitoring System

The Energy Monitoring System is a project that aims to provide real-time monitoring and analysis of energy consumption in a building or facility. It utilizes a combination of technologies, including React with EUI for the front-end, Express for the backend, Prisma as an ORM, and PostgreSQL as the database. This README file provides an overview of the project, installation instructions, and other relevant information.

## Feature
- Real-time monitoring of energy consumption
- Visualization of energy data through graphs and charts
- Historical data analysis
- Integration with electronic devices for control and monitoring

## Technologies Used
- React with EUI: A JavaScript library for building user interfaces, specifically designed for enterprise applications.
- Express: A web application framework for Node.js that provides a robust set of features for web and mobile applications.
- Prisma: A modern database toolkit and ORM (Object-Relational Mapping) for Node.js and TypeScript.
- PostgreSQL: A powerful, open-source relational database management system

## Installation
### Prerequisites

Before installing the Energy Monitoring System, ensure that the following software is installed on your machine:
- Node.js: Download and install Node.js from the official website ([https://nodejs.org](https://nodejs.org)).
- PostgreSQL: Install PostgreSQL on your system ([https://www.postgresql.org/download/](https://www.postgresql.org/download/)).

### Setting Up the Backend
1. Clone the repository to your local machine:
```bash
   git clone https://github.com/your-username/energy-monitoring-system.git
```
2. Navigate to the backend directory:
   ```bash
   cd energy-monitoring-system/backend
```
3. Install the dependency
```bash
   npm install
```
4. Create a `.env` file in the backend directory and add the following configurations: 
```bash
PORT=3001 DATABASE_URL=postgresql://username:password@localhost:5432/energy_monitoring_system`
```
	Replace `username` and `password` with your PostgreSQL credentials.
5. Generate the Prisma client:
```bash
npx prisma generate
```
6. Run the database migrations:
```bash
   npx prisma migrate dev --name init
```
7. Start the backend server:
```bash
   npm start
```

### Setting Up the Frontend

1. Navigate to the frontend directory:
```bash
   cd ../frontend
```

2. Install the dependencies:
```bash
   npm install
```

3. Start the frontend development server:
```bash
   npm start
```

4. Open your web browser and visit `http://localhost:3000` to access the Energy Monitoring System.