import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import { FaTrash } from "react-icons/fa";

import "./Moradores.css";

function Encomendas() {
  const [encomendas, setEncomendas] = useState([]);

  const [novaEncomenda, setNovaEncomenda] = useState({
    morador: "",
    unidade: "",
    descricao: "",
    status: "Recebida",
  });

  useEffect(() => {
    carregarEncomendas();
  }, []);

  const carregarEncomendas = async () => {
    try {
      const response = await api.get("/encomendas");
      setEncomendas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarEncomenda = async () => {
    try {
      if (
        !novaEncomenda.morador ||
        !novaEncomenda.unidade ||
        !novaEncomenda.descricao
      ) {
        alert("Preencha todos os campos");
        return;
      }

      await api.post(
        "/encomendas",
        novaEncomenda
      );

      setNovaEncomenda({
        morador: "",
        unidade: "",
        descricao: "",
        status: "Recebida",
      });

      carregarEncomendas();
    } catch (error) {
      console.error(error);
    }
  };

  const excluirEncomenda = async (id) => {
    if (
      !window.confirm(
        "Deseja excluir esta encomenda?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/encomendas/${id}`);

      carregarEncomendas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout titulo="Encomendas">

      <div className="cards-moradores">

        <div className="card-info">
          <h3>Encomendas</h3>
          <h1>{encomendas.length}</h1>
        </div>

        <div className="card-info">
          <h3>Recebidas</h3>
          <h1>
            {
              encomendas.filter(
                (e) => e.status === "Recebida"
              ).length
            }
          </h1>
        </div>

      </div>

      <div className="formulario">

        <h2>Nova Encomenda</h2>

        <input
          type="text"
          placeholder="Morador"
          value={novaEncomenda.morador}
          onChange={(e) =>
            setNovaEncomenda({
              ...novaEncomenda,
              morador: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Unidade"
          value={novaEncomenda.unidade}
          onChange={(e) =>
            setNovaEncomenda({
              ...novaEncomenda,
              unidade: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Descrição"
          value={novaEncomenda.descricao}
          onChange={(e) =>
            setNovaEncomenda({
              ...novaEncomenda,
              descricao: e.target.value,
            })
          }
        />

        <button onClick={adicionarEncomenda}>
          Registrar
        </button>

      </div>

      <div className="tabela-container">

        <table>

          <thead>
            <tr>
              <th>Morador</th>
              <th>Unidade</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {encomendas.map((encomenda) => (
              <tr key={encomenda._id}>
                <td>{encomenda.morador}</td>
                <td>{encomenda.unidade}</td>
                <td>{encomenda.descricao}</td>
                <td>{encomenda.status}</td>

                <td>
                  <button
                    className="btn-excluir"
                    onClick={() =>
                      excluirEncomenda(
                        encomenda._id
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

export default Encomendas;