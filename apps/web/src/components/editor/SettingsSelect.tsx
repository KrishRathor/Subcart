import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SettingsSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const SettingsSelect: React.FC<SettingsSelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition appearance-none"
        style={{ backgroundImage: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="%239ca3af" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/></svg>')`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
