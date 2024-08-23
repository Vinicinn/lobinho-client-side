import "./Logar.css";
import { useState } from "react";

function Logar({ onLogin }) {
  const [nick, setNick] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(nick);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="labelnick">Digite seu nick:</label>
      <input
        type="text"
        id="nick"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        required
      ></input>
      <button className="entrar" type="submit">Entrar</button>
    </form>
  );
}

export default Logar;
