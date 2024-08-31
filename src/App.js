import { useState } from "react";
import "./app.css";
import Logar from "./components/Logar/Logar.js";
import Lobby from "./components/Lobby/Lobby.js";

function App({ socket }) {
  const [conectado, setConectado] = useState(false);

  const handleLogin = (nickValue) => {
    socket.emit("novoJogador", nickValue);
    setConectado(true);
  };

  return (
    <div className="App">
      {conectado ? (
        <Lobby socket={socket} />
      ) : (
        <Logar socket={socket} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
