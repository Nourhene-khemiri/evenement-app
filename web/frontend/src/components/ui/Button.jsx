export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false }) {
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger:  'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}