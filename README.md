## NG logistics app

1. **User Authentication**:
   - Sign up, login, and logout functionality.
   - User profiles.

2. **Driver Authentication**:
   - Sign up, login, and logout functionality.
   - Driver profiles.

3. **Request Delivery**:
   - Users can request delivery.
   - Users can specify pickup and drop-off locations.

4. **Driver Assignment**:
   - Assign available drivers to delivery requests.
   - Notify drivers of new delivery requests.

5. **Delivery Tracking**:
   - Track the status and location of deliveries in real-time.
   - Notify users of delivery status updates.

6. **Payment Processing**:
   - Users can pay for deliveries.
   - Payment history for users and drivers.

7. **Administrative Dashboard**:
   - Admin can manage users, drivers, and delivery requests.
   - View reports and analytics.



### Pseudocode Plan for the user and driver authentication

#### 1. User Authentication
- **Sign Up**:
  - Input: username, password, email
  - Validation: Check if username/email already exists
  - Hash the password
  - Store user data in the database
  - Return success message or error

- **Login**:
  - Input: username/email, password
  - Validation: Check if username/email exists
  - Verify password
  - Generate JWT token
  - Return token or error

- **Logout**:
  - Invalidate the token

#### 2. Driver Authentication
- **Sign Up**:
  - Input: username, password, email, vehicle details
  - Validation: Check if username/email already exists
  - Hash the password
  - Store driver data in the database
  - Return success message or error

- **Login**:
  - Input: username/email, password
  - Validation: Check if username/email exists
  - Verify password
  - Generate JWT token
  - Return token or error

- **Logout**:
  - Invalidate the token
