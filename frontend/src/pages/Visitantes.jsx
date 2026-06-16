import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./Moradores.css";

function Visitantes() {
  const [visitantes, setVisitantes] =
    useState([]);

  const [modoEdicao, setModoEdicao] =
    useState(false);

  const [idEdicao, setIdEdicao] =
    useState(null);

  const [novoVisitante, setNovoVisitante] =
    useState({
      nome: "",
      documento: "",
      apartamento: "",
      dataVisita: "",
      status: "Autorizado",
    });

  useEffect(() => {
    carregarVisitantes();
  }, []);

  const carregarVisitantes = async () => {
    try {
      const response = await api.get(
        "/visitantes"
      );

      setVisitantes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const salvarVisitante = async () => {
    try {
      if (
        !novoVisitante.nome ||
        !novoVisitante.documento
      ) {
        alert(
          "Preencha os campos obrigatórios"
        );
        return;
      }

      if (modoEdicao) {
        await api.put(
          `/visitantes/${idEdicao}`,
          novoVisitante
        );

        setModoEdicao(false);
        setIdEdicao(null);
      } else {
        await api.post(
          "/visitantes",
          novoVisitante
        );
      }

      setNovoVisitante({
        nome: "",
        documento: "",
        apartamento: "",
        dataVisita: "",
        status: "Autorizado",
      });

      carregarVisitantes();
    } catch (error) {
      console.error(error);
    }
  };

  const editarVisitante = (
    visitante
  ) => {
    setNovoVisitante({
      nome: visitante.nome,
      documento: visitante.documento,
      apartamento:
        visitante.apartamento,
      dataVisita:
        visitante.dataVisita,
      status: visitante.status,
    });

    setModoEdicao(true);
    setIdEdicao(visitante._id);
  };

  const excluirVisitante = async (id) => {
    if (
      !window.confirm(
        "Deseja excluir este visitante?"
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/visitantes/${id}`
      );

      carregarVisitantes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout titulo="Visitantes">

      <div className="cards-moradores">

        <div className="card-info">
          <h3>Visitantes</h3>
          <h1>{visitantes.length}</h1>
        </div>

        <div className="card-info">
          <h3>Autorizados</h3>
          <h1>
            {visitantes.length}
          </h1>
        </div>

      </div>

      <div className="formulario">

        <h2>
          {modoEdicao
            ? "Editar Visitante"
            : "Novo Visitante"}
        </h2>

        <input
          type="text"
          placeholder="Nome"
          value={novoVisitante.nome}
          onChange={(e) =>
            setNovoVisitante({
              ...novoVisitante,
              nome: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Documento"
          value={novoVisitante.documento}
          onChange={(e) =>
            setNovoVisitante({
              ...novoVisitante,
              documento:
                e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Apartamento"
          value={
            novoVisitante.apartamento
          }
          onChange={(e) =>
            setNovoVisitante({
              ...novoVisitante,
              apartamento:
                e.target.value,
            })
          }
        />

        <input
          type="date"
          value={
            novoVisitante.dataVisita
          }
          onChange={(e) =>
            setNovoVisitante({
              ...novoVisitante,
              dataVisita:
                e.target.value,
            })
          }
        />

        <button
          onClick={salvarVisitante}
        >
          {modoEdicao
            ? "Salvar Alterações"
            : "Cadastrar"}
        </button>

      </div>

      <div className="tabela-container">

        <table>

          <thead>
            <tr>
              <th>Nome</th>
              <th>Documento</th>
              <th>Apartamento</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {visitantes.map(
              (visitante) => (
                <tr
                  key={visitante._id}
                >
                  <td>
                    {visitante.nome}
                  </td>

                  <td>
                    {
                      visitante.documento
                    }
                  </td>

                  <td>
                    {
                      visitante.apartamento
                    }
                  </td>

                  <td>
                    {
                      visitante.dataVisita
                    }
                  </td>

                  <td>
                    {
                      visitante.status
                    }
                  </td>

                  <td>

                    <button
                      className="btn-editar"
                      onClick={() =>
                        editarVisitante(
                          visitante
                        )
                      }
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn-excluir"
                      onClick={() =>
                        excluirVisitante(
                          visitante._id
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Visitantes;