# README



Below are instructions on how to set up and run the code locally, along with relevant documentation to help understand the solution better.

## Setup and Run

### Prerequisites

- Ensure that Docker and Docker Compose are installed on your machine.

### Installation

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project directory.

### Running the Application

1.  Run `docker-compose up --build` to start the defined services.
2.  The application should be accessible on `http://localhost:3000`

## Design Choices and Assumptions

### HTTP Request Authentication Middleware

The HTTP request authentication middleware code provides user registration and login via `UserController` service, token verification and authentication for incoming requests.

### TypeORM and TypeDI

The code utilizes TypeORM and TypeDI for database management and dependency injection, respectively. These libraries were chosen for their robustness, ease of use, and community support. TypeORM provides an ORM (Object-Relational Mapping) to simplify database interactions, while TypeDI offers a powerful dependency injection container for managing dependencies in a modular and maintainable manner.


## Running E2E Jest Tests

To run the Jest tests for the provided application, follow the instructions below:

### Prerequisites

- Node.js and npm should be installed on your machine.

### Running Jest Tests

Since the application has been dockerized, if you wish to run the tests, it would be on your local machine. Follow the steps below to run the Jest tests:

1. Open a terminal and navigate to the root directory of the application.
2. Run the following command to install the necessary dependencies:
   ```bash
   `npm install`
   ```
3. Once the dependencies are installed, you can run the Jest tests using the following command:
   ```bash
   `npm run test`
   ```
   This command will start the Jest test runner and execute the tests for the application.

Please note that the tests should be run on your local machine, as the application has been dockerized. If you wish to run the tests on the dockerized application, you will need to run the command `npm run test` on the docker container
