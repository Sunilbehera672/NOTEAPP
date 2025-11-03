import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, LogOut } from "lucide-react";
const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
    }, 500);
    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  useEffect(() => {
    setSearch("");
  }, [user]);

  function handelLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className="bg-blue-950 text-white p-4 shadow-lg items-center">
      <div className="flex container mx-auto items-center justify-between">
        <Link to="/">Notes App</Link>
        {user && (
          <>
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="w-full px-4 py-2 bg-blue-900 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-lg font-medium">
                <CircleUser className="w-5 h-5 text-blue-300" />
                {user.username}
              </span>
              <button
                onClick={handelLogout}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
