import "./Lobby.css";
import { useEffect, useState } from "react";

function Lobby({ socket }) {
  let [jogadores, setJogadores] = useState([]);
  let [pronto, setPronto] = useState(false);
  let [prontos, setProntos] = useState(0);
  let [contagem, setContagem] = useState(false);

  const alterarBotao = () => {
    setPronto(!pronto);
    socket.emit("alterarPronto", !pronto);
  };

  useEffect(() => {
    socket.on("jogadores", (novosJogadores) => {
      setJogadores(novosJogadores);
    });
    socket.on("prontos", (quantidadeProntos) => {
      setProntos(quantidadeProntos);
    });
  }, [socket]);

  return (
    <>
      <div className="lobby">
        <h1 className="tituloLobby">Jogadores no lobby:</h1>
        {jogadores.length < 4 ? (
          <h3>é necessario no minimo 4 jogadores</h3>
        ) : (
          <h3>
            jogadores prontos {prontos}/{jogadores.length}
          </h3>
        )}
        <ul>
          {jogadores.map((jogador) => (
            <li key={jogador.id}>
              {jogador.pronto ? `${jogador.nome} (pronto)` : jogador.nome}
            </li>
          ))}
        </ul>
        <button
          className="botaoPronto"
          onClick={alterarBotao}
          disabled={jogadores.length < 4}
        >
          {pronto ? "cancelar" : "pronto"}
        </button>
      </div>
    </>
  );
}

export default Lobby;
