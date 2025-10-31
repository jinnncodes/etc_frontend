import type { ChangeEvent } from "react";

interface Props {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-2 rounded border bg-gray-800 text-white"
        required
      />
    </div>
  );
}
