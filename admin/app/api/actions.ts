/////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>///////////////////

////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>///////////////////

//Interfaces

export interface Carrier {
  _id?: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  account_name: string;
  account_number: number;
  account_bank: string;
  agent_id?: string;
  active: boolean;
  approved: boolean;
  rating: number;
  address: string;
  refer: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  _id?: string;
  user_id: string;
  carrier_id: string;
  transaction_id: string;
  amount: number;
  status: "pending" | "inprogress" | "delivered" | "cancelled";
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Otp {
  _id?: string;
  user_id: string;
  carrier_id: string;
  order_id: string;
  otp: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Rate {
  _id?: string;
  user_id: string;
  carrier_id: string;
  order_id: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Transaction {
  _id?: string;
  user_id: string;
  wallet_id: string;
  amount: number;
  type: "credit" | "debit";
  status: "pending" | "completed" | "failed";
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  pnumber: string;
  refer: number;
  type: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Wallet {
  _id?: string;
  user_id: string;
  number: number;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Authentication

export async function authenticateUser(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_URL}/auth/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate user");
  }

  return response.json();
}

export async function authenticateAdmin(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_URL}/auth/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate admin");
  }

  return response.json();
}

export async function authenticateCarrier(
  email: string,
  password: string
): Promise<{ carrier: Carrier; token: string }> {
  const response = await fetch(`${API_URL}/auth/carriers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate carrier");
  }

  return response.json();
}


// User

export async function createUser(user: User): Promise<User> {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export async function updateUser(
  userId: string,
  updates: Partial<User>,
  token: string
): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}

export async function getUser(userId: string, token: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
}

export async function getAllUsers(token: string): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch all users data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetch all users data: ", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch all users data: ", error);
    throw error;
  }
}

export async function fetchUsersByMonth(token: string, month: string) {
  const response = await fetch(`${API_URL}/users?month=${month}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users data for the month");
  }

  return response.json();
}

export async function fetchUserData(token: string) {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
}

// Carrier

export async function createCarrier(carrier: Carrier): Promise<Carrier> {
  const response = await fetch(`${API_URL}/carriers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrier),
  });

  if (!response.ok) {
    throw new Error("Failed to create carrier");
  }

  return response.json();
}

export async function updateCarrier(
  carrierId: string,
  updates: Partial<Carrier>,
  token: string
): Promise<Carrier> {
  const response = await fetch(`${API_URL}/carriers/${carrierId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update carrier");
  }

  return response.json();
}

export async function getCarrier(
  carrierId: string,
  token: string
): Promise<Carrier> {
  const response = await fetch(`${API_URL}/carriers/${carrierId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch carrier data");
  }

  return response.json();
}

export async function getAllCarriers(token: string): Promise<Carrier[]> {
  const response = await fetch(`${API_URL}/carriers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all carriers data");
  }

  return response.json();
}

export async function getApprovedCarriers(token: string): Promise<Carrier[]> {
  const response = await fetch(`${API_URL}/carriers?active=1&approved=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch approved carriers data");
  }

  return response.json();
}

// Wallet

export async function getAllWallets(token: string): Promise<Wallet[]> {
  const response = await fetch(`${API_URL}/wallets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all wallets");
  }

  return response.json();
}

export async function getWalletOfUserByAdmin(
  token: string,
  userId: string
): Promise<Wallet> {
  const response = await fetch(`${API_URL}/wallets/${userId}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wallet of user by admin");
  }

  return response.json();
}

export async function getWalletForCurrentUser(token: string): Promise<Wallet> {
  const response = await fetch(`${API_URL}/wallets/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wallet for current user");
  }

  return response.json();
}

// Transaction

export async function createTransaction(
  transaction: Partial<Transaction>,
  token: string
): Promise<Transaction> {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return response.json();
}

export async function getAllTransactionsForUser(
  token: string
): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all transactions for user");
  }

  return response.json();
}

export async function getAllTransactionsByAdmin(
  token: string
): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all transactions by admin");
  }

  return response.json();
}

export async function getTransactionById(
  transactionId: string,
  token: string
): Promise<Transaction> {
  const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transaction by ID");
  }

  return response.json();
}

// Order

export async function createOrder(
  order: Partial<Order>,
  token: string
): Promise<Order> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

export async function addCarrierToOrder(
  orderId: string,
  carrierId: string,
  token: string
): Promise<Order> {
  const response = await fetch(
    `${API_URL}/or
  Create Rating by a User
  
  POST /ratings Request Headers: Authorization: Bearer <user_token> Request:
  
  {
    "rating": 4,
    "order_id": "<order_id>"
  }
  Response:
  {
    "id": "<rating_id>",
    "rating": 4,
    "order_id": "<order_id>",
    "user_id": "<user_id>"
  }
  
  Get All Ratings by a User
  
  GET /ratings Request Headers: Authorization: Bearer <user_token>
  
  json
  [
    {
      "id": "<rating_id>",
      "rating": 4,
      "order_id": "<order_id>",
      "user_id": "<user_id>"
    }
  ]
  
  Update Rating by ID
  
  PUT /ratings/:rating_id Request Headers: Authorization: Bearer <user_token> Request:
  
  {
    "rating": 5.0
  }
  Response:
  {
    "id": "<rating_id>",
    "rating": 5.0,
    "order_id": "<order_id>",
    "user_id": "<user_id>"
  }
  
  Get a Particular Rating
  
  GET /ratings/:rating_id Request Headers: Authorization: Bearer <user_token>
  
  {
    "id": "<rating_id>",
    "rating": 4,
    "order_id": "<order_id>",
    "user_id": "<user_id>"
  }
  ders/${orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ carrier_id: carrierId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add carrier to order");
  }

  return response.json();
}

export async function getAllOrdersByAdmin(token: string): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all orders by admin");
  }

  return response.json();
}

export async function getAllOrdersForUser(token: string): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all orders for user");
  }

  return response.json();
}

export async function getAllOrders(token: string): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all orders");
  }

  return response.json();
}

export async function getOrdersByMonth(token: string, month: string) {
  const response = await fetch(`${API_URL}/orders?month=${month}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders data for the month");
  }

  return response.json();
}

// actions.ts
export async function updateOrderStatus(
  orderId: string,
  status: string,
  token: string
): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Failed to update order status: ${errorMessage}`);
    throw new Error(errorMessage);
  }

  return response.json();
}

// Rating
export async function getAllRatings(
  token: string
): Promise<
  {
    id: string;
    rating: number;
    order_id: string;
    user_id: string;
    carrier_id: string;
  }[]
> {
  const response = await fetch(`${API_URL}/ratings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ratings data");
  }

  return response.json();
}

// Customer

export async function getCustomersForCarrier(
  carrierId: string,
  token: string
): Promise<User[]> {
  const response = await fetch(`${API_URL}/carriers/${carrierId}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers for carrier");
  }

  return response.json();
}



//OTP 


export async function createOtp(otp: Otp): Promise<Otp> {
  const response = await fetch(`${API_URL}/otps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(otp),
  });

  if (!response.ok) {
    throw new Error("Failed to create otp");
  }

  return response.json();
}
