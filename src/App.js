import { useState } from "react";
import "./app.css";
import Logar from "./components/Logar/Logar.js";
import Lobby from "./components/Lobby/Lobby.js";
import Game from "./components/Game/Game.js";

function App({ socket }) {
  const [conectado, setConectado] = useState(false);
  const [ingamge, setIngame] = useState(false);

  const handleLogin = (nickValue) => {
    socket.emit("entrar", nickValue, (response) => {
      if (response.status === "ok") {
        setConectado(true);
      } else {
        alert("nick ja em uso");
      }
    });
  };

  const startGame = () => {
    setIngame(true);
  };

  return (
    <div className="App">
      {conectado ? (
        <>
          {ingamge ? (
            <Game socket={socket} />
          ) : (
            <Lobby socket={socket} start={startGame} />
          )}
        </>
      ) : (
        <Logar socket={socket} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
