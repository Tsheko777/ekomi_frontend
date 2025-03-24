React Frontend Setup
Overview

This React app serves as the frontend for interacting with the Laravel backend. The application allows users to log in using their credentials, stores the authentication token, and interacts with the backend to retrieve sender data from the /api/contact/email API endpoint.
Technology Stack

    Frontend: React (JavaScript library)

    Backend: Laravel (with Sanctum for authentication)

    State Management: Built-in React hooks (e.g., useState, useEffect)

Setup Instructions

1. Install Dependencies

Ensure all necessary dependencies are installed before starting the React application:

    Navigate to the ekomi_frontend directory:

cd ekomi_frontend

Install the dependencies:

    npm install

2. Run the Development Server

To run the React development server locally, use the following command:

npm start

Once the server is running, open your browser and go to http://localhost:3000 to view the React app. 3. Configure the API URL

Ensure the React app is correctly configured to communicate with the backend API. The API URL can be set in an environment variable to point to the Laravel server.

    Create a .env file in the ekomi_frontend directory if it doesn’t exist.

    Add the following configuration (adjust the API URL as needed):

    REACT_APP_API_URL=http://localhost:8000/api

This will configure the React app to communicate with the backend API at http://localhost:8000. 4. Authentication Flow

The React app integrates with the Laravel backend using Sanctum for authentication. Here’s the general flow:

    Login: Users log in with their email (andre@gmail.com) and password (andre#777@).

    Token Storage: Upon successful login, the backend returns a Sanctum token, which is then stored in the browser (typically in localStorage or cookies).

    Authenticated Requests: The token is included in the Authorization header for subsequent requests to authenticated routes like /api/contact/email.

5.  Testing the Login and API Calls
    Testing Login

        Open the React app in your browser at http://localhost:3000.

        Enter the following credentials to log in:

            Email: andre@gmail.com

            Password: andre#777@

        Upon successful login, the backend will return an authentication token, which will be used for future requests.

Testing the /api/contact/email Endpoint

After logging in, you can test the /api/contact/email API endpoint to retrieve sender data:

    Open the React app and ensure that the frontend is correctly fetching the sender data using the email stehr.petra@bauch.com.

    The token, stored after login, is automatically included in API requests as a Bearer token in the request headers.

6. Handling Logout

When the user logs out, clear the authentication token from localStorage or cookies and redirect the user to the login page.

Example of the logout flow:

    Remove the token stored in localStorage:

localStorage.removeItem('token');

Redirect to the login page or reset the UI to indicate that the user is logged out.
# ekomi_frontend
