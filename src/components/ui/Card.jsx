export default function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-4 transition-transform duration-150 ease-out active:scale-[0.98]">
      {children}
    </div>
  );
}
