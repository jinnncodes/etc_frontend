import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginForm, LoginResponse } from "../api/auth";
import { login } from "../api/auth";

const ROLES = ["Admin", "Driver", "Branch Coordinator"];
const BRANCHES = [
  "Main Branch",
  "Branch 1",
  "Branch 2",
  "Branch 3",
  "Branch 4",
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    role: "",
    branch: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log("Submitted");

    try {
      const data: LoginResponse = await login(form);
      console.log("Login Response:", data);

      if (data.access_token) {
        localStorage.setItem(
          "userData",
          JSON.stringify({ name: data.name?.trim() || "Tony Stark" })
        );
        setMessage("Login successful!");
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch {
      console.log("1");
      setMessage("Connection error. Check backend on port 8000.");
    } finally {
      console.log("2");
      setLoading(false);
    }
  };

  const showBranchSelect = form.role === "Branch Coordinator";

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormSelect
            label="Role"
            name="role"
            options={ROLES}
            value={form.role}
            onChange={handleChange}
          />

          {showBranchSelect && (
            <FormSelect
              label="Branch"
              name="branch"
              options={BRANCHES}
              value={form.branch ?? ""}
              onChange={handleChange}
            />
          )}

          <FormInput
            label="Email"
            name="email"
            type="text"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

// Reusable Select Component
interface SelectProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
function FormSelect({ label, name, options, value, onChange }: SelectProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange} required>
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// Reusable Input Component
interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function FormInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
