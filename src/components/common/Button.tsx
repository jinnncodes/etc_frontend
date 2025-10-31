import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  color?: "green" | "red" | "blue" | "gray";
  size?: "sm" | "md" | "lg";
type?: "button" | "submit" | "reset";

  onClick?: () => void;
  className?: string;
}

const colorClasses: Record<string, string> = {
  green: "bg-green-600 hover:bg-green-700 text-white",
  red: "bg-red-600 hover:bg-red-700 text-white",
  blue: "bg-blue-600 hover:bg-blue-700 text-white",
  gray: "bg-gray-600 hover:bg-gray-700 text-white",
};

const sizeClasses: Record<string, string> = {
  sm: "text-xs px-3 py-1",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-3",
};

export default function Button({
  children,
  color = "blue",
  size = "sm",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
      style={{ fontSize: "0.8rem" }}
    >
      {children}
    </button>
  );
}
