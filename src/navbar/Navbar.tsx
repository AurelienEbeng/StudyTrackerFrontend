import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";

const links = [
  { href: "/", label: "Highlight" },
  { href: "/tasks", label: "Tasks" },
  { href: "/session", label: "Session" },
  { href: "/profile", label: "Profile" },
  { href: "/logout", label: "Logout" },
];
const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };
  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <span>Study Tracker</span>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((item) => (
            <li key={item.href} onClick={ToggleOpenMenu}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={ToggleOpenMenu} />
      </div>
    </div>
  );
};

export default Navbar;
