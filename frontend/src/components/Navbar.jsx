import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Leaf, LogOut, Menu, X, LayoutDashboard, PlusCircle, Users } from "lucide-react"

const NAV_LINKS = {
  farmer:    [
    { to: "/farmer/dashboard",  label: "Dashboard", icon: LayoutDashboard },
    { to: "/farmer/add-batch",  label: "Add Batch",  icon: PlusCircle },
  ],
  processor: [{ to: "/processor/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  warehouse: [{ to: "/warehouse/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  retailer:  [{ to: "/retailer/dashboard",  label: "Dashboard", icon: LayoutDashboard }],
  admin:     [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users",     label: "Users",      icon: Users },
  ],
}

const ROLE_COLORS = {
  farmer:    { bg: "#dcfce7", color: "#15803d" },
  processor: { bg: "#dbeafe", color: "#1d4ed8" },
  warehouse: { bg: "#fef3c7", color: "#d97706" },
  retailer:  { bg: "#f3e8ff", color: "#7c3aed" },
  admin:     { bg: "#fee2e2", color: "#dc2626" },
}

const Navbar = () => {
  const { user, logout }      = useAuth()
  const navigate               = useNavigate()
  const location               = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const links     = NAV_LINKS[user?.role] || []
  const roleColor = ROLE_COLORS[user?.role] || {}

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      background: "white",
      borderBottom: "2px solid #dcfce7",
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 1.5rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>

        {/* Logo */}
        <Link to="/" style={{
          display: "flex", alignItems: "center",
          gap: 8, textDecoration: "none"
        }}>
          <div style={{
            width: 36, height: 36,
            background: "#16a34a",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Leaf size={20} color="white" />
          </div>
          <span style={{
            fontSize: "1.3rem", fontWeight: 900,
            color: "#14532d", fontFamily: "Nunito, sans-serif"
          }}>
            Agri<span style={{ color: "#16a34a" }}>Chain</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}
             className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                fontFamily: "Nunito, sans-serif",
                background: isActive(link.to) ? "#dcfce7" : "transparent",
                color: isActive(link.to) ? "#15803d" : "#166534",
                transition: "all 0.2s"
              }}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

          {/* Role badge */}
          <span style={{
            padding: "4px 12px",
            borderRadius: 9999,
            fontSize: "0.75rem",
            fontWeight: 700,
            background: roleColor.bg,
            color: roleColor.color,
            fontFamily: "Nunito, sans-serif"
          }}>
            {user?.role?.toUpperCase()}
          </span>

          {/* User name */}
          <span style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#14532d",
            fontFamily: "Nunito, sans-serif"
          }}
            className="hide-mobile">
            {user?.name}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px",
              background: "#fef2f2",
              color: "#dc2626",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "0.9rem",
              fontFamily: "Nunito, sans-serif",
              transition: "all 0.2s"
            }}
          >
            <LogOut size={16} />
            <span className="hide-mobile">Logout</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              padding: 8,
              background: "#f0fdf4",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              color: "#16a34a"
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "white",
          borderTop: "1px solid #dcfce7",
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 700,
                color: "#166534",
                background: isActive(link.to) ? "#dcfce7" : "#f0fdf4",
                fontFamily: "Nunito, sans-serif"
              }}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
          <div style={{
            padding: "12px 16px",
            background: "#f0fdf4",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontWeight: 700, color: "#14532d", fontSize: "0.9rem" }}>
                {user?.name}
              </p>
              <p style={{ color: "#16a34a", fontSize: "0.8rem", fontWeight: 600 }}>
                {user?.role}
              </p>
            </div>
            <button onClick={handleLogout} className="btn-danger"
              style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .hide-mobile  { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar