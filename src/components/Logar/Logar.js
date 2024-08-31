import Ajuda from "../Ajuda/Ajuda";
import "./Logar.css";
import { useEffect, useState } from "react";

function Logar({ socket, onLogin }) {
  const [nick, setNick] = useState("");
  const [ajuda, setAjuda] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(nick);
  };

  const changeHelp = () => {
    setAjuda(!ajuda);
  };

  useEffect(() => {});

  return (
    <>
      <div className="loginClass">
        {ajuda ? (
          <Ajuda socket={socket} onClose={changeHelp} />
        ) : (
          <button className="openHelpButton" onClick={changeHelp}>
            ?
          </button>
        )}
        <form onSubmit={handleSubmit}>
          <label className="labelnick">Digite seu nick:</label>
          <input
            type="text"
            id="nick"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            required
          ></input>
          <button className="entrar" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}

export default Logar;
