import "./Lobby.css";
import { useEffect, useState } from "react";

function Lobby({ socket, start }) {
  let [jogadores, setJogadores] = useState([]);
  let [pronto, setPronto] = useState(false);
  let [prontos, setProntos] = useState(0);
  let [contagem, setContagem] = useState(false);
  let [seconds, setSeconds] = useState(5);

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
    socket.on("iniciarContagem", () => {
      setContagem(true);
    });
    socket.on("pararContagem", () => {
      setContagem(false);
      setSeconds(5);
    });
    if (contagem && seconds > 0) {
      let timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (seconds === 0) {
      start();
    }
  }, [socket, contagem, seconds, start]);

  return (
    <>
      <div className="lobby">
        <h1 className="tituloLobby">Jogadores no lobby:</h1>
        {jogadores.length < 4 ? (
          <h3>é necessario no minimo 4 jogadores</h3>
        ) : (
          <>
            {contagem ? (
              <h3>iniciando em {seconds}...</h3>
            ) : (
              <h3>
                jogadores prontos {prontos}/{jogadores.length}
              </h3>
            )}
          </>
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
          // disabled={jogadores.length < 4}
        >
          {pronto ? "cancelar" : "pronto"}
        </button>
      </div>
    </>
  );
}

export default Lobby;
