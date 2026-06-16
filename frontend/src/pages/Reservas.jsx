import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./Moradores.css";

function Reservas() {
  const [reservas, setReservas] =
    useState([]);

  const [modoEdicao, setModoEdicao] =
    useState(false);

  const [idEdicao, setIdEdicao] =
    useState(null);

  const [novaReserva, setNovaReserva] =
    useState({
      areaComum: "",
      morador: "",
      data: "",
      horario: "",
      status: "Confirmada",
    });

  useEffect(() => {
    carregarReservas();
  }, []);

  const carregarReservas = async () => {
    try {
      const response = await api.get(
        "/reservas"
      );

      setReservas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const salvarReserva = async () => {
    try {
      if (
        !novaReserva.areaComum ||
        !novaReserva.morador
      ) {
        alert(
          "Preencha os campos obrigatórios"
        );
        return;
      }

      if (modoEdicao) {
        await api.put(
          `/reservas/${idEdicao}`,
          novaReserva
        );

        setModoEdicao(false);
        setIdEdicao(null);
      } else {
        await api.post(
          "/reservas",
          novaReserva
        );
      }

      setNovaReserva({
        areaComum: "",
        morador: "",
        data: "",
        horario: "",
        status: "Confirmada",
      });

      carregarReservas();
    } catch (error) {
      console.error(error);
    }
  };

  const editarReserva = (
    reserva
  ) => {
    setNovaReserva({
      areaComum:
        reserva.areaComum,
      morador: reserva.morador,
      data: reserva.data,
      horario: reserva.horario,
      status: reserva.status,
    });

    setModoEdicao(true);
    setIdEdicao(reserva._id);
  };

  const excluirReserva = async (id) => {
    if (
      !window.confirm(
        "Deseja excluir esta reserva?"
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/reservas/${id}`
      );

      carregarReservas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout titulo="Reservas">

      <div className="cards-moradores">

        <div className="card-info">
          <h3>Reservas</h3>
          <h1>{reservas.length}</h1>
        </div>

        <div className="card-info">
          <h3>Confirmadas</h3>
          <h1>{reservas.length}</h1>
        </div>

      </div>

      <div className="formulario">

        <h2>
          {modoEdicao
            ? "Editar Reserva"
            : "Nova Reserva"}
        </h2>

        <input
          type="text"
          placeholder="Área Comum"
          value={novaReserva.areaComum}
          onChange={(e) =>
            setNovaReserva({
              ...novaReserva,
              areaComum:
                e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Morador"
          value={novaReserva.morador}
          onChange={(e) =>
            setNovaReserva({
              ...novaReserva,
              morador:
                e.target.value,
            })
          }
        />

        <input
          type="date"
          value={novaReserva.data}
          onChange={(e) =>
            setNovaReserva({
              ...novaReserva,
              data: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Horário"
          value={novaReserva.horario}
          onChange={(e) =>
            setNovaReserva({
              ...novaReserva,
              horario:
                e.target.value,
            })
          }
        />

        <button
          onClick={salvarReserva}
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
              <th>Área</th>
              <th>Morador</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {reservas.map(
              (reserva) => (
                <tr
                  key={reserva._id}
                >
                  <td>
                    {
                      reserva.areaComum
                    }
                  </td>

                  <td>
                    {
                      reserva.morador
                    }
                  </td>

                  <td>
                    {reserva.data}
                  </td>

                  <td>
                    {
                      reserva.horario
                    }
                  </td>

                  <td>
                    {
                      reserva.status
                    }
                  </td>

                  <td>

                    <button
                      className="btn-editar"
                      onClick={() =>
                        editarReserva(
                          reserva
                        )
                      }
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn-excluir"
                      onClick={() =>
                        excluirReserva(
                          reserva._id
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

export default Reservas;