export default function Input({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}