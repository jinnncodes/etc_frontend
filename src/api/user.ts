import { API_BASE_URL } from "./config";

export interface User {
  [key: string]: unknown;
  id?: number;
  name: string;
  email: string;
  role: "Admin" | "Driver" | "Coordinator";
  branch_id: string | number;
  created_at?: string;
  updated_at?: string;
  password?: string; // only for creation
}

/**
 * Get access token from localStorage
 */
function getToken(): string | null {
  return localStorage.getItem("access_token");
}

/**
 * Fetch users from API
 */
export async function getUsers(): Promise<User[]> {
  const token = getToken();
  if (!token) throw new Error("No access token found");

  const res = await fetch(`${API_BASE_URL}/api/users`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

  const raw = await res.text();
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse JSON:", raw, err);
    throw new Error("Invalid JSON response from server");
  }
}


/**
 * Create new user
 */
export async function createUser(userData: User): Promise<User> {
  const token = getToken();
  if (!token) throw new Error("No access token found");

  try {
    const res = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const raw = await res.text();
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse JSON:", raw, err);
      throw new Error("Invalid JSON response from server");
    }
  } catch (err) {
    console.error("Create user failed:", err);
    throw err;
  }
}

/**
 * Update user
 */
export async function updateUser(id: number, userData: User): Promise<User> {
  const token = getToken();
  if (!token) throw new Error("No access token found");

  try {
    const res = await fetch(`${API_BASE_URL}/api/user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const raw = await res.text();
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse JSON:", raw, err);
      throw new Error("Invalid JSON response from server");
    }
  } catch (err) {
    console.error("Update user failed:", err);
    throw err;
  }
}

/**
 * Delete user
 */
export async function deleteUser(id: number): Promise<boolean> {
  const token = getToken();
  if (!token) throw new Error("No access token found");

  try {
    const res = await fetch(`${API_BASE_URL}/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const raw = await res.text();
    try {
      const data = JSON.parse(raw);
      return data.success ?? true;
    } catch (err) {
      console.error("Failed to parse JSON:", raw, err);
      // Assume delete success if no JSON returned
      return true;
    }
  } catch (err) {
    console.error("Delete user failed:", err);
    throw err;
  }
}
