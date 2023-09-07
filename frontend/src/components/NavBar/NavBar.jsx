import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/vehicles" className="text-white hover:text-blue-400">
          Your Vehicles
        </Link>
        <Link to="/vehicles/new" className="text-white hover:text-blue-400">
          Add a Vehicle
        </Link>
      </div>
    </nav>
  );
}
