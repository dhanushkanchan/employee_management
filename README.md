# Employee Management System

This is a simple Employee Management System that allows managers to upload a list of employees from a CSV file, view and categorize employees as current or former, and visualize the organizational hierarchy.

## Features

- Upload employee data from a CSV file
- View and categorize employees as current or former
- Visualize employee hierarchy
- Responsive frontend using Material-UI and React
- Backend API using Django REST framework
- Dockerized for easy deployment

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/employee-management.git
    cd employee-management
    ```

2. **Set up environment configuration**:
    Create a file named `.env` in the project root directory and add the following environment variables:
    ```env
    DB_NAME=employee_db
    DB_USER=dassault_admin
    DB_PASSWORD=pwd
    DB_HOST=db
    DB_PORT=3306
    ```

3. **Build and start the Docker containers**:
    ```bash
    docker-compose up --build
    ```

4. **Apply Django migrations**:
    ```bash
    docker exec -it backend python manage.py migrate
    ```

5. **Create a superuser for accessing the Django admin panel**:
    ```bash
    docker exec -it backend python manage.py createsuperuser
    ```

## Usage

1. **Access the application**:
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:8000`
    - Django Admin Panel: `http://localhost:8000/admin`

2. **Upload CSV File**:
    - Navigate to the upload page and upload a CSV file containing employee data. The CSV file should have the following columns:
        - `first_name`, `last_name`, `email`, `phone_number`, `date_of_birth`, `date_of_joining`, `position`, `department`, `salary`, `is_current`, `supervisor_email`

3. **View Employee List**:
    - Navigate to the employee list page to view and categorize employees.

4. **Visualize Hierarchy**:
    - Navigate to the hierarchy page to visualize the organizational structure.

## API Endpoints

- **GET /api/employees/**: List employees
- **POST /api/upload/**: Upload a CSV file to add/update employees
- **GET /api/statistics/**: Get the dashboard analytics and charts data
- **GET /api/hierarchy/**: Get the organizational hierarchy

