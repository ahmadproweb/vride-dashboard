import React, { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { label: "Dashboard", path: "/dashboard", icon: <FaClipboardList /> },
  ];

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <HiMenu />
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="nav">
          <ul>
            {links.map((link) => (
              <li
                key={link.path}
                className={`navItem ${location.pathname === link.path ? "active" : ""}`}
                onClick={() => window.innerWidth <= 922 && setIsOpen(false)}
              >
                <Link to={link.path} className="link">
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideNavbar;
