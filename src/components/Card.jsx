export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
