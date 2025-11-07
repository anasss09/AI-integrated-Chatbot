import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-all"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            Career<span className="text-blue-600">Guide</span>
          </h1>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {authUser && (
            <>
              {/* Logout Button - Solid Color */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white
                bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
