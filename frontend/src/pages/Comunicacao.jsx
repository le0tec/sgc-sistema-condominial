import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import { FaTrash } from "react-icons/fa";

import "./Moradores.css";

function Comunicacao() {
  const [comunicados, setComunicados] = useState([]);

  const [novoComunicado, setNovoComunicado] = useState({
    titulo: "",
    mensagem: "",
  });

  useEffect(() => {
    carregarComunicados();
  }, []);

  const carregarComunicados = async () => {
    try {
      const response = await api.get("/comunicacao");

      setComunicados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarComunicado = async () => {
    try {
      if (
        !novoComunicado.titulo ||
        !novoComunicado.mensagem
      ) {
        alert("Preencha todos os campos");
        return;
      }

      await api.post(
        "/comunicacao",
        novoComunicado
      );

      setNovoComunicado({
        titulo: "",
        mensagem: "",
      });

      carregarComunicados();
    } catch (error) {
      console.error(error);
    }
  };

  const excluirComunicado = async (id) => {
    if (
      !window.confirm(
        "Deseja excluir este comunicado?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/comunicacao/${id}`);

      carregarComunicados();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout titulo="Comunicação">

      <div className="cards-moradores">

        <div className="card-info">
          <h3>Comunicados</h3>
          <h1>{comunicados.length}</h1>
        </div>

      </div>

      <div className="formulario">

        <h2>Novo Comunicado</h2>

        <input
          type="text"
          placeholder="Título"
          value={novoComunicado.titulo}
          onChange={(e) =>
            setNovoComunicado({
              ...novoComunicado,
              titulo: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Mensagem"
          value={novoComunicado.mensagem}
          onChange={(e) =>
            setNovoComunicado({
              ...novoComunicado,
              mensagem: e.target.value,
            })
          }
        />

        <button onClick={adicionarComunicado}>
          Publicar
        </button>

      </div>

      <div className="tabela-container">

        <table>

          <thead>
            <tr>
              <th>Título</th>
              <th>Mensagem</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {comunicados.map((comunicado) => (
              <tr key={comunicado._id}>
                <td>{comunicado.titulo}</td>
                <td>{comunicado.mensagem}</td>

                <td>
                  {new Date(
                    comunicado.createdAt
                  ).toLocaleDateString("pt-BR")}
                </td>

                <td>
                  <button
                    className="btn-excluir"
                    onClick={() =>
                      excluirComunicado(
                        comunicado._id
                      )
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

export default Comunicacao;