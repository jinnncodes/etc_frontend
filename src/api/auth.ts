import { API_BASE_URL } from "./config";

export interface LoginForm {
  role: string;
  branch?: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token?: string;
  name?: string;
}

export async function login(form: LoginForm): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const raw = await res.text();

    let data: LoginResponse;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse JSON response:", raw, err);
      throw new Error("Invalid JSON response from server");
    }

    console.log("Login response:", data);

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: data.name,
          role: form.role,
          branch: form.branch || "",
        })
      );
    }

    return data;
  } catch (err) {
    console.error("Login failed:", err);
    return { message: "Login failed. Check console for details." };
  }
}

export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

/**
 * Logout function
 */
export async function logout(): Promise<string> {
  const token = getToken();
  let message = "Logged out successfully";

  if (token) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      try {
        const data = await res.json();
        if (data.message) message = data.message;
      } catch (err) {
        const text = await res.text();
        console.error("Failed to parse logout response:", text, err);
      }
    } catch (err) {
      console.error("Logout API failed", err);
    }
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("userData");
  localStorage.removeItem("sidebarOpen");

  return message;
}

/**
 * Fetch protected data
 */
export async function fetchProtectedData(url: string) {
  const token = getToken();
  if (!token) throw new Error("No access token found");

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    try {
      return await res.json();
    } catch (err) {
      const text = await res.text();
      console.error("Failed to parse protected data response:", text, err);
      throw new Error("Invalid JSON response from server");
    }
  } catch (err) {
    console.error("Fetch protected data failed:", err);
    throw err;
  }
}
