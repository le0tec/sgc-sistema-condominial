import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import { FaTrash } from "react-icons/fa";

import "./Moradores.css";

function Financeiro() {
  const [lancamentos, setLancamentos] = useState([]);

  const [novoLancamento, setNovoLancamento] = useState({
    descricao: "",
    valor: "",
    vencimento: "",
    status: "Pendente",
  });

  useEffect(() => {
    carregarLancamentos();
  }, []);

  const carregarLancamentos = async () => {
    try {
      const response = await api.get("/financeiro");
      setLancamentos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarLancamento = async () => {
    try {
      if (
        !novoLancamento.descricao ||
        !novoLancamento.valor ||
        !novoLancamento.vencimento
      ) {
        alert("Preencha todos os campos");
        return;
      }

      await api.post(
        "/financeiro",
        novoLancamento
      );

      setNovoLancamento({
        descricao: "",
        valor: "",
        vencimento: "",
        status: "Pendente",
      });

      carregarLancamentos();
    } catch (error) {
      console.error(error);
    }
  };

  const excluirLancamento = async (id) => {
    if (
      !window.confirm(
        "Deseja excluir este lançamento?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/financeiro/${id}`);
      carregarLancamentos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout titulo="Financeiro">

      <div className="cards-moradores">

        <div className="card-info">
          <h3>Lançamentos</h3>
          <h1>{lancamentos.length}</h1>
        </div>

        <div className="card-info">
          <h3>Pendentes</h3>
          <h1>
            {
              lancamentos.filter(
                (l) => l.status === "Pendente"
              ).length
            }
          </h1>
        </div>

      </div>

      <div className="formulario">

        <h2>Novo Lançamento</h2>

        <input
          type="text"
          placeholder="Descrição"
          value={novoLancamento.descricao}
          onChange={(e) =>
            setNovoLancamento({
              ...novoLancamento,
              descricao: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Valor"
          value={novoLancamento.valor}
          onChange={(e) =>
            setNovoLancamento({
              ...novoLancamento,
              valor: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={novoLancamento.vencimento}
          onChange={(e) =>
            setNovoLancamento({
              ...novoLancamento,
              vencimento: e.target.value,
            })
          }
        />

        <button onClick={adicionarLancamento}>
          Registrar
        </button>

      </div>

      <div className="tabela-container">

        <table>

          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {lancamentos.map((lancamento) => (
              <tr key={lancamento._id}>
                <td>{lancamento.descricao}</td>

                <td>
                  R$ {Number(lancamento.valor).toFixed(2)}
                </td>

                <td>{lancamento.vencimento}</td>

                <td>{lancamento.status}</td>

                <td>
                  <button
                    className="btn-excluir"
                    onClick={() =>
                      excluirLancamento(
                        lancamento._id
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

export default Financeiro;