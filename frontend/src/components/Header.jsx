import "./Header.css";
import { FaBars, FaUserCircle } from "react-icons/fa";

function Header({ titulo }) {
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  return (
    <div className="header">

      <div className="header-left">
        <FaBars size={25} />
        <h1>{titulo}</h1>
      </div>

      <div className="header-user">

        <FaUserCircle size={45} />

        <div>
          <strong>
            {usuario?.nome || "Usuário"}
          </strong>

          <p>
            {usuario?.email || ""}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Header;