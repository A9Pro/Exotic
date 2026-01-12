export default function Header({ title = "Exotic" }) {
  return (
    <header className="flex items-center justify-between p-4 bg-exotic-white shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold text-exotic-charcoal">{title}</h1>
      <div className="flex space-x-3">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div> 
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div> 
      </div>
    </header>
  );
}
