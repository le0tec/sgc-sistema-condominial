import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaBullhorn,
  FaBoxOpen,
  FaDollarSign,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  return (
    <div className="sidebar">
      <div>
        <h2 className="logo-sidebar">SGC</h2>

        <ul className="menu">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaHome />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/moradores"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaUsers />
              Moradores
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/visitantes"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaUserFriends />
              Visitantes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reservas"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaCalendarAlt />
              Reservas
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/ocorrencias"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaExclamationTriangle />
              Ocorrências
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/comunicacao"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaBullhorn />
              Comunicação
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/encomendas"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaBoxOpen />
              Encomendas
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/financeiro"
              className={({ isActive }) =>
                isActive
                  ? "menu-link active-link"
                  : "menu-link"
              }
            >
              <FaDollarSign />
              Financeiro
            </NavLink>
          </li>
        </ul>
      </div>

      <div
        className="logout"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Sair
      </div>
    </div>
  );
}

export default Sidebar;