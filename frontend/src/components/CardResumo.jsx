import "./CardResumo.css";

function CardResumo({ titulo, valor, icone }) {
  return (
    <div className="card-resumo">
      <div className="icone-card">
        {icone}
      </div>

      <div>
        <h3>{titulo}</h3>
        <h1>{valor}</h1>
      </div>
    </div>
  );
}

export default CardResumo;