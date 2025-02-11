# Project Name

## Description
This project is a full-stack application with a React-based frontend and a Node.js/Express backend, using MongoDB as the database. It includes authentication, role-based access, and order management features.

## Features
- User authentication (JWT-based login/logout)
- Role-based access control (Admin, Manager, User)
- Order management (Create, Update, View Orders)
- Payment integration
- Responsive UI with React and Ant Design
- Secure API endpoints

## Setup Instructions

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and configure the following variables:
   ```sh
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## Assumptions, Challenges, and Limitations
- Assumes a stable internet connection for API requests.
- Payment gateway integration requires additional configuration.
- UI may need further optimization for large datasets.
- Performance testing and optimizations are ongoing.


