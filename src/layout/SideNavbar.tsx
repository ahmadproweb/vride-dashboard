import  { useState, useEffect } from "react";
import { FaBullhorn, FaClipboardList } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { MdBookOnline, MdOutlineAdsClick } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1000);
  const [paths, setpaths] = useState<'/dashboard'|'/ads-manager' | '/ads' | ''>('/dashboard');
 
  useEffect(()=>{
    setpaths('');
  },[])
  

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
    { label: "Ads Section", path: "/ads-manager", icon: <FaBullhorn /> },
    { label: "Your Ads", path: "/ads", icon: <MdOutlineAdsClick /> },
    { label: "Bookings", path: "/bookngs", icon: <MdBookOnline /> },



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
                className={paths===link.path?`navItem active`:''}
                onClick={() => {
                  window.innerWidth <= 922 && setIsOpen(false);
                  setpaths(link.path as any)
                }}
              >
                <Link style={{backgroundColor:location.pathname === link.path?'#FFD200':''}} to={link.path} className="link">
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
