interface ProfileInputProps {
  label: string;
  type: string;
  value: string;
  disabled?: boolean; // Tambahkan prop ini
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileInput({
  label,
  type,
  value,
  disabled,
  onChange,
}: ProfileInputProps) {
  return (
    <div className="w-full max-w-lg space-y-2">
      <label className="text-sm font-light text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full py-2 border-b text-lg font-bold focus:outline-none transition-all
          ${
            disabled
              ? "border-transparent bg-transparent text-gray-700 cursor-not-allowed"
              : "border-gray-200 focus:border-b-red-800 focus:border-b-2 text-black"
          }`}
      />
    </div>
  );
}
