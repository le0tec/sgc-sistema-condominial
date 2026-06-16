import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";

function Layout({ titulo, children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-content">
        <Header titulo={titulo} />

        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;