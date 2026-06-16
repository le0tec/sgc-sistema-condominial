// frontend/src/pages/Ocorrencias.jsx

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { FaTrash } from "react-icons/fa";
import "./Moradores.css";

function Ocorrencias() {
  const [ocorrencias, setOcorrencias] = useState([]);

  const [novaOcorrencia, setNovaOcorrencia] = useState({
    titulo: "",
    descricao: "",
    status: "Aberta",
  });

  useEffect(() => {
    carregarOcorrencias();
  }, []);

  async function carregarOcorrencias() {
    try {
      const response = await api.get("/ocorrencias");
      setOcorrencias(response.data);
    } catch (error) {
      console.error("Erro ao carregar ocorrências", error);
    }
  }

  async function cadastrarOcorrencia() {
    try {
      await api.post("/ocorrencias", novaOcorrencia);

      setNovaOcorrencia({
        titulo: "",
        descricao: "",
        status: "Aberta",
      });

      carregarOcorrencias();
    } catch (error) {
      console.error("Erro ao cadastrar ocorrência", error);
    }
  }

  async function excluirOcorrencia(id) {
    try {
      await api.delete(`/ocorrencias/${id}`);
      carregarOcorrencias();
    } catch (error) {
      console.error("Erro ao excluir ocorrência", error);
    }
  }

  return (
    <Layout titulo="Ocorrências">

      <div className="cards-moradores">

        <div className="card-info">
          <h3>Total de Ocorrências</h3>
          <h1>{ocorrencias.length}</h1>
        </div>

        <div className="card-info">
          <h3>Ocorrências Abertas</h3>
          <h1>
            {
              ocorrencias.filter(
                (o) => o.status === "Aberta"
              ).length
            }
          </h1>
        </div>

        <div className="card-info">
          <h3>Resolvidas</h3>
          <h1>
            {
              ocorrencias.filter(
                (o) => o.status === "Resolvida"
              ).length
            }
          </h1>
        </div>

      </div>

      <div className="formulario">

        <h2>Nova Ocorrência</h2>

        <input
          type="text"
          placeholder="Título"
          value={novaOcorrencia.titulo}
          onChange={(e) =>
            setNovaOcorrencia({
              ...novaOcorrencia,
              titulo: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Descrição"
          value={novaOcorrencia.descricao}
          onChange={(e) =>
            setNovaOcorrencia({
              ...novaOcorrencia,
              descricao: e.target.value,
            })
          }
        />

        <button onClick={cadastrarOcorrencia}>
          Registrar
        </button>

      </div>

      <div className="tabela-container">

        <table>

          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {ocorrencias.map((ocorrencia) => (
              <tr key={ocorrencia._id}>
                <td>{ocorrencia.titulo}</td>
                <td>{ocorrencia.descricao}</td>
                <td>{ocorrencia.status}</td>

                <td>
                  <button
                    className="btn-excluir"
                    onClick={() =>
                      excluirOcorrencia(ocorrencia._id)
                    }
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Ocorrencias;