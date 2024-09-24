import "./Game.css";
import { useEffect, useState } from "react";

function Game({ socket }) {
  const [noite, setNoite] = useState(1);
  const [seconds, setSeconds] = useState(5);
  const [state, setState] = useState("noite");
  const [funcao, setFuncao] = useState({});
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    socket.emit("carreguei");
    setNoite(1);
    socket.on("receberNomes", (data) => {
      setNomes(data);
    });
  }, [socket]);

  useEffect(() => {
    if (seconds > 0) {
      let timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (seconds === 0) {
      socket.emit("esperandoFuncao");
      socket.on("receberFuncao", (data) => {
        setFuncao(data);
        setState("funcao");
        socket.emit("esperandoNomes");
      });
    }
  }, [seconds, socket]);

  return (
    <div className="gameContent">
      {(() => {
        switch (state) {
          case "noite":
            return (
              <>
                <h2>{noite}ª noite</h2>
                <p>
                  Anoiteceu, todos os jogadores fecham os olhos e vão dormir.
                </p>
                <p>{seconds}</p>
              </>
            );
          case "funcao":
            return (
              <>
                <h2>{funcao.nome}</h2>
                <p>{funcao.descricao}</p>
                {funcao.seleciona && (
                  <ul>
                    {nomes.map((nome) => (
                      <li key={nome}>{nome}</li>
                    ))}
                  </ul>
                )}
                {funcao.acoes.length > 0 ? (
                  funcao.acoes.map((acao) => {
                    return <button>{acao}</button>;
                  })
                ) : (
                  <button>OK</button>
                )}
              </>
            );
          default:
            break;
        }
      })()}
    </div>
  );
}

export default Game;
