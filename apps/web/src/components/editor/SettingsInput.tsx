import React from 'react';

interface SettingsInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string; // text, number, color etc.
  min?: number;  // for type="number"
  max?: number;  // for type="number"
  step?: number; // for type="number"
}

export const SettingsInput: React.FC<SettingsInputProps> = ({
  label, value, onChange, type = 'text', ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition"
        {...props} // Pass min, max, step etc.
      />
    </div>
  );
};
