import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import { FaEdit, FaTrash } from "react-icons/fa";

import "./Moradores.css";

function Moradores() {
  const [moradores, setMoradores] = useState([]);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);

  const [novoMorador, setNovoMorador] = useState({
    nome: "",
    unidade: "",
    telefone: "",
    email: "",
    status: "Ativo",
  });

  useEffect(() => {
    carregarMoradores();
  }, []);

  const carregarMoradores = async () => {
    try {
      const response = await api.get("/moradores");
      setMoradores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const salvarMorador = async () => {
    if (
      !novoMorador.nome ||
      !novoMorador.unidade
    ) {
      alert("Preencha nome e unidade");
      return;
    }

    try {
      if (modoEdicao) {
        await api.put(
          `/moradores/${idEdicao}`,
          novoMorador
        );

        setModoEdicao(false);
        setIdEdicao(null);
      } else {
        await api.post(
          "/moradores",
          novoMorador
        );
      }

      setNovoMorador({
        nome: "",
        unidade: "",
        telefone: "",
        email: "",
        status: "Ativo",
      });

      carregarMoradores();
    } catch (error) {
      console.error(error);
    }
  };

  const editarMorador = (morador) => {
    setNovoMorador({
      nome: morador.nome,
      unidade: morador.unidade,
      telefone: morador.telefone,
      email: morador.email,
      status: morador.status,
    });

    setModoEdicao(true);
    setIdEdicao(morador._id);
  };

  const excluirMorador = async (id) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir este morador?"
    );

    if (!confirmar) return;

    try {
      await api.delete(`/moradores/${id}`);

      carregarMoradores();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout titulo="Moradores">
      <div className="cards-moradores">

        <div className="card-info">
          <h3>Moradores</h3>
          <h1>{moradores.length}</h1>
        </div>

        <div className="card-info">
          <h3>Unidades Ocupadas</h3>
          <h1>{moradores.length}</h1>
        </div>

        <div className="card-info">
          <h3>Moradores Ativos</h3>
          <h1>
            {
              moradores.filter(
                (morador) =>
                  morador.status === "Ativo"
              ).length
            }
          </h1>
        </div>

      </div>

      <div className="formulario">

        <h2>
          {modoEdicao
            ? "Editar Morador"
            : "Novo Morador"}
        </h2>

        <input
          type="text"
          placeholder="Nome"
          value={novoMorador.nome}
          onChange={(e) =>
            setNovoMorador({
              ...novoMorador,
              nome: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Unidade"
          value={novoMorador.unidade}
          onChange={(e) =>
            setNovoMorador({
              ...novoMorador,
              unidade: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Telefone"
          value={novoMorador.telefone}
          onChange={(e) =>
            setNovoMorador({
              ...novoMorador,
              telefone: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={novoMorador.email}
          onChange={(e) =>
            setNovoMorador({
              ...novoMorador,
              email: e.target.value,
            })
          }
        />

        <button onClick={salvarMorador}>
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
              <th>Unidade</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {moradores.map((morador) => (
              <tr key={morador._id}>

                <td>{morador.nome}</td>
                <td>{morador.unidade}</td>
                <td>{morador.telefone}</td>
                <td>{morador.email}</td>
                <td>{morador.status}</td>

                <td>

                  <button
                    className="btn-editar"
                    onClick={() =>
                      editarMorador(morador)
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn-excluir"
                    onClick={() =>
                      excluirMorador(
                        morador._id
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

export default Moradores;