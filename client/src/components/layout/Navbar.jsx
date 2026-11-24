
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  Heart,
  LayoutDashboard,
  BriefcaseBusiness,
  HandHeart,
  LogIn,
  UserPlus,
  LogOut,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navigate = useNavigate();

  // Safely read user information
  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (error) {
      console.error("User data error:", error);
      return null;
    }
  };

  const token = localStorage.getItem("token");
  const user = getStoredUser();

  const isAuthenticated = Boolean(token && user);

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/", icon: Heart },
    { name: "Report", path: "/report", icon: ShieldCheck },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    {
      name: "Opportunities",
      path: "/opportunities",
      icon: BriefcaseBusiness
    },
    { name: "Support", path: "/support", icon: HandHeart }
  ];

  // Active navigation styling
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-pink-50 text-[#D90083]"
        : "text-gray-600 hover:bg-pink-50 hover:text-[#D90083]"
    }`;

  // Close mobile menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    closeMenu();
    navigate("/login", { replace: true });
  };

  // User initial
  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  // Reusable logo
  const Logo = () => (
    <Link
      to="/"
      onClick={closeMenu}
      className="flex shrink-0 items-center gap-3"
      aria-label="Her Gasha Home"
    >
      {!logoError ? (
        <img
          src="/images/her-gasha-logo.png"
          alt="Her Gasha logo"
          className="h-12 w-12 rounded-full border border-pink-100 bg-white object-contain"
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D90083] to-[#4B1248] text-white shadow-md">
          <HeartHandshake size={27} />
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-xl font-extrabold leading-tight text-[#4B1248]">
          Her Gasha
        </span>

        <span className="text-[9px] font-bold tracking-wider text-gray-500 sm:text-[10px]">
          SAFETY • OPPORTUNITY • SUPPORT
        </span>
      </div>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur-md">

      {/* ================= MAIN NAVBAR ================= */}

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Logo />

        {/* ================= DESKTOP NAVIGATION ================= */}

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={linkClass}
              >
                <Icon size={17} />
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* ================= DESKTOP AUTHENTICATION ================= */}

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">

              {/* User information */}
              <div className="flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4B1248] text-sm font-bold text-white">
                  {userInitial}
                </div>

                <div className="flex max-w-28 flex-col">
                  <span className="truncate text-sm font-bold text-[#4B1248]">
                    {user?.name || "User"}
                  </span>

                  <span className="text-[10px] text-gray-500">
                    Welcome back
                  </span>
                </div>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-pink-200 px-4 py-2.5 text-sm font-semibold text-[#4B1248] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#4B1248] transition hover:bg-pink-50"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/join"
                className="flex items-center gap-2 rounded-lg bg-[#D90083] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#B80070] hover:shadow-lg"
              >
                <UserPlus size={17} />
                Join Her Gasha
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="rounded-lg p-2 text-[#4B1248] transition hover:bg-pink-50 lg:hidden"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* ================= MOBILE NAVIGATION ================= */}

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-pink-100 bg-white px-4 py-5 shadow-lg lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3">

            {/* Mobile logo */}
            <div className="mb-2">
              <Logo />
            </div>

            {/* Navigation links */}
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-pink-50 text-[#D90083]"
                        : "text-gray-600 hover:bg-pink-50 hover:text-[#D90083]"
                    }`
                  }
                >
                  <Icon size={19} />
                  {link.name}
                </NavLink>
              );
            })}

            <div className="my-2 border-t border-gray-100" />

            {/* Mobile authentication */}
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 rounded-xl bg-pink-50 p-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4B1248] text-lg font-bold text-white">
                    {userInitial}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#4B1248]">
                      {user?.name || "User"}
                    </span>

                    <span className="text-xs text-gray-500">
                      Welcome back to Her Gasha
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={19} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#4B1248] transition hover:bg-pink-50"
                >
                  <LogIn size={19} />
                  Login
                </Link>

                <Link
                  to="/join"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#D90083] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#B80070]"
                >
                  <UserPlus size={19} />
                  Join Her Gasha
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
