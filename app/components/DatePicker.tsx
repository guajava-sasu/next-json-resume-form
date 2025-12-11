// src/components/DatePicker.tsx
"use client";

interface DatePickerProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function DatePicker({ name, label, value, onChange, required }: DatePickerProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        required={required}
        className="p-2 border rounded"
      />
    </div>
  );
}
