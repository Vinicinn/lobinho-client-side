import "./Lobby.css";
import { useEffect, useState } from "react";

function Lobby({ socket }) {
  let [jogadores, setJogadores] = useState([]);
  let [pronto, setPronto] = useState(false);
  let [prontos, setProntos] = useState(0);

  const alterarBotao = () => {
    setPronto(!pronto);
    socket.emit("alterarPronto", !pronto);
  };

  useEffect(() => {
    socket.on("atualizarJogadores", (novosJogadores) => {
      setJogadores(novosJogadores);
    });
    socket.on("jogadoresProntos", (jogadoresProntos) => {
      setProntos(jogadoresProntos);
    });
  }, [socket]);

  return (
    <>
      <div className="lobby">
        <h1 className="tituloLobby">Jogadores no lobby:</h1>
        <h3>
          jogadores prontos {prontos}/{jogadores.length}
        </h3>
        <ul>
          {jogadores.map((jogador) => (
            <li key={jogador.id}>{jogador.nome}</li>
          ))}
        </ul>
        <button className="botaoPronto" onClick={alterarBotao}>
          {pronto ? "cancelar" : "pronto"}
        </button>
      </div>
    </>
  );
}

export default Lobby;
