import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Moradores from "./pages/Moradores";
import Visitantes from "./pages/Visitantes";
import Reservas from "./pages/Reservas";
import Ocorrencias from "./pages/Ocorrencias";
import Comunicacao from "./pages/Comunicacao";
import Encomendas from "./pages/Encomendas";
import Financeiro from "./pages/Financeiro";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/moradores"
          element={
            <PrivateRoute>
              <Moradores />
            </PrivateRoute>
          }
        />

        <Route
          path="/visitantes"
          element={
            <PrivateRoute>
              <Visitantes />
            </PrivateRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <Reservas />
            </PrivateRoute>
          }
        />

        <Route
          path="/ocorrencias"
          element={
            <PrivateRoute>
              <Ocorrencias />
            </PrivateRoute>
          }
        />

        <Route
          path="/comunicacao"
          element={
            <PrivateRoute>
              <Comunicacao />
            </PrivateRoute>
          }
        />

        <Route
          path="/encomendas"
          element={
            <PrivateRoute>
              <Encomendas />
            </PrivateRoute>
          }
        />

        <Route
          path="/financeiro"
          element={
            <PrivateRoute>
              <Financeiro />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;