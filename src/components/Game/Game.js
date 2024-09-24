import "./Game.css";
import { useEffect, useState } from "react";

function Game({ socket }) {
  const [noite, setNoite] = useState(1);
  const [seconds, setSeconds] = useState(5);
  const [state, setState] = useState("noite");
  const [funcao, setFuncao] = useState([]);

  useEffect(() => {
    socket.emit("carreguei");
  }, [socket]);

  useEffect(() => {
    if (seconds > 0) {
      let timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (seconds === 0) {
      setState("funcao");
      socket.emit("esperandoFuncao");
      socket.on("receberFuncao", (data) => {
        setFuncao(data);
        console.log(data);
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
            return <p>{funcao.nome}</p>;
          default:
            break;
        }
      })()}
    </div>
  );
}

export default Game;
