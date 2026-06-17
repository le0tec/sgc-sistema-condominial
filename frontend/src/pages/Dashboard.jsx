import { useEffect, useState } from "react";
import api from "../services/api";

import Layout from "../components/Layout";

import {
  FaUsers,
  FaUserFriends,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {
  const [moradores, setMoradores] = useState([]);
  const [visitantes, setVisitantes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const moradoresRes = await api.get(
        "/moradores"
      );

      const visitantesRes = await api.get(
        "/visitantes"
      );

      const reservasRes = await api.get(
        "/reservas"
      );

      const ocorrenciasRes = await api.get(
        "/ocorrencias"
      );

      setMoradores(moradoresRes.data);
      setVisitantes(visitantesRes.data);
      setReservas(reservasRes.data);
      setOcorrencias(ocorrenciasRes.data);
    } catch (error) {
      console.error(
        "Erro ao carregar dashboard:",
        error
      );
    }
  };

  return (
    <Layout titulo="Dashboard">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <FaUsers />
          <h3>Moradores</h3>
          <h1>{moradores.length}</h1>
        </div>

        <div className="dashboard-card">
          <FaUserFriends />
          <h3>Visitantes</h3>
          <h1>{visitantes.length}</h1>
        </div>

        <div className="dashboard-card">
          <FaCalendarAlt />
          <h3>Reservas</h3>
          <h1>{reservas.length}</h1>
        </div>

        <div className="dashboard-card">
          <FaExclamationTriangle />
          <h3>Ocorrências</h3>
          <h1>{ocorrencias.length}</h1>
        </div>
      </div>

      <div className="dashboard-paineis">
        <div className="painel">
          <h2>Últimas Reservas</h2>

          <ul>
            {reservas
              .slice(0, 5)
              .map((reserva) => (
                <li key={reserva._id}>
                  {reserva.areaComum} -{" "}
                  {reserva.data}
                </li>
              ))}
          </ul>
        </div>

        <div className="painel">
          <h2>Resumo do Sistema</h2>

          <ul>
            <li>
              Total de Moradores:{" "}
              {moradores.length}
            </li>
            <li>
              Total de Visitantes:{" "}
              {visitantes.length}
            </li>
            <li>
              Total de Reservas:{" "}
              {reservas.length}
            </li>
            <li>
              Total de Ocorrências:{" "}
              {ocorrencias.length}
            </li>
          </ul>
        </div>
      </div>

      <div className="painel">
        <h2>Últimas Ocorrências</h2>

        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {ocorrencias
              .slice(0, 5)
              .map((ocorrencia) => (
                <tr key={ocorrencia._id}>
                  <td>
                    {ocorrencia.titulo}
                  </td>
                  <td>
                    {ocorrencia.descricao}
                  </td>
                  <td>
                    {ocorrencia.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Dashboard;